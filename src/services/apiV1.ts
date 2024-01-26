/* eslint-disable no-console */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { nanoid } from "nanoid";
import { Environments, Keys, MOCK_API_DEBUG, MOCK_API_FLAG, getCC, getEnv, getSessionId } from "../config";
import { IpLocation, Recommendation } from "../types.d";

export interface ApiError {
	message: string;
	timestamp: string;
	requestId: string;
}

export interface ApiSuccess {
	message: string;
	trackingId: string;
}

export type ApiResult = ApiSuccess | ApiError;

const API_V1 = "/api/v1";
const MAX_TIMEOUT = 5000;
const API_HOST = getEnv() === Environments.PRODUCTION ? "https://api.metronai.com" : "http://localhost:8080";

const ENDPOINTS = {
	ipLocation: `${API_HOST}${API_V1}/ip/location`,
	subscribe: `${API_HOST}${API_V1}/metaintro/subscribe/sendgrid`,
	recommendations: `${API_HOST}${API_V1}/affiliates/recommendations`,
	recommendationsSubscribe: `${API_HOST}${API_V1}/metaintro/recommendations`
};

function getDefaultHeaders(): Record<string, string> {
	const DEFAULT_HEADERS = {
		"X-Request-ID": nanoid(8),
		"X-Session-CC": getCC() ?? "",
		"X-Session-ID": getSessionId(),
		"Content-Type": "application/json",
		"X-Session-Language": navigator.language,
		"Access-Control-Allow-Origin": `${window?.location?.origin}`, // Enable CORS
		"X-Session-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
	};
	return DEFAULT_HEADERS;
}

/**
 * @used for localhost/testing only, mock api response
 * excluded from production build
 */
function getMockResponse<T>(config: AxiosRequestConfig, error: boolean = false): Promise<T | object> {
	const method = config.method || "get";
	const basePath = config.url?.replace(API_HOST, "").replace(/\//g, "-").replace(/^-/, "") || "default";
	const jsonFileName = `${basePath}-${method.toLowerCase()}.json`;
	if (MOCK_API_DEBUG) console.debug(`Mocking ${method} ${config.url} with ${jsonFileName}`);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return (
		import(`./fakeDB/${jsonFileName}`)
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			.then((module) => {
				if (error) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
					return module.default.error;
				}
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, prettier/prettier, @typescript-eslint/no-unsafe-assignment
				return { data: module.default.success};
			})
			.catch(() => {
				return {};
			})
	);
}

interface ApiOptions extends AxiosRequestConfig {
	cacheKey?: string;
}

async function apiV1<T>(options: ApiOptions, mockError: boolean = false): Promise<AxiosResponse<T>> {
	const fullUrl = options.url?.startsWith("http") ? options.url : `${API_HOST}${options.url}`;
	const mergedOptions = {
		...options,
		url: fullUrl,
		method: options.method || "get",
		timeout: options.timeout || MAX_TIMEOUT,
		headers: { ...getDefaultHeaders(), ...options.headers }
	};

	if (MOCK_API_FLAG) {
		const mockData = await getMockResponse<T>(mergedOptions, mockError);
		if (MOCK_API_DEBUG) console.debug("Mock data", mockData);
		return Promise.resolve(mockData as AxiosResponse<T>);
	}

	if (options.cacheKey && sessionStorage.getItem(options.cacheKey)) {
		const cachedData = JSON.parse(sessionStorage.getItem(options.cacheKey) || "{}") as T;
		return Promise.resolve({ data: cachedData } as AxiosResponse<T>);
	}

	try {
		const response = await axios(mergedOptions);
		if (options.cacheKey) sessionStorage.setItem(options.cacheKey, JSON.stringify(response.data));
		return response;
	} catch (error) {
		return Promise.reject(error);
	}
}

interface SubscribeData {
	email: string;
	fullName: string;
	utm_source?: string;
	utm_medium?: string;
	utm_campaign?: string;
	referral_code?: string;
	referring_site?: string;
	send_welcome_email?: boolean;
	reactivate_existing?: boolean;
	custom_fields?: Record<string, string>;
}

/**
 * Subscribes to newsletter.
 * @param {SubscribeData} subscribeData - Data for the subscription.
 * @returns {Promise<ApiResult>} - The response from the subscription API.
 * @example subscribe({ email: " ", utm_source: " ", utm_medium: " " });
 */
export async function subscribe(data: SubscribeData): Promise<ApiResult> {
	try {
		return (
			await apiV1<ApiSuccess>({
				method: "put",
				url: ENDPOINTS.subscribe,
				data: JSON.stringify(data)
			})
		).data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const errorResponse = error.response?.data as ApiError;
			const customError: ApiError = {
				timestamp: errorResponse?.timestamp,
				requestId: errorResponse?.requestId,
				message: errorResponse?.message || "An error occurred during subscription"
			};
			return customError;
		}
		return {
			requestId: `local-${nanoid(8)}`,
			timestamp: new Date().toISOString(),
			message: "An unexpected error occurred during subscription"
		} as ApiError;
	}
}

type IpLocationResponse = IpLocation | ApiError;
export async function getIpLocation(): Promise<IpLocationResponse> {
	try {
		return (await apiV1<IpLocation>({ url: ENDPOINTS.ipLocation, cacheKey: Keys.cc })).data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const errorResponse = error.response?.data as ApiError;
			const customError: ApiError = {
				timestamp: errorResponse?.timestamp,
				requestId: errorResponse?.requestId,
				message: errorResponse?.message || "An error occurred during get ip location request"
			};
			throw customError;
		}
		const defaultError: ApiError = {
			requestId: `local-${nanoid(8)}`,
			timestamp: new Date().toISOString(),
			message: "An unexpected error occurred during get ip location request"
		};
		throw defaultError;
	}
}

/**
 * Gets recommendations.
 * @returns {Promise<Recommendation[] | ApiError>} - The response from the recommendations API.
 * @example await getRecommendations();
 */
export async function getRecommendations(): Promise<Recommendation[] | ApiError> {
	try {
		/**
		 * X-Session-CC header is required for recommendations API
		 * and  are  being  prefetched  on  mount app (with delay)
		 * but in the  event  where  the  user  is  fast enough to
		 * click or when direct  hit on  the  recommendations page
		 * we need to make sure that the X-Session-CC is available
		 */
		const headers: Record<string, string> = {
			// getIpLocation will fall to cache if exists
			"X-Session-CC": ((await getIpLocation()) as IpLocation)?.countryCode || ""
		};
		return (
			await apiV1<Recommendation[]>({
				headers,
				url: ENDPOINTS.recommendations,
				cacheKey: Keys.recommendations
			})
		).data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const errorResponse = error.response?.data as ApiError;
			const customError: ApiError = {
				timestamp: errorResponse?.timestamp,
				requestId: errorResponse?.requestId,
				message: errorResponse?.message || "An error occurred during get recommendations request"
			};
			throw customError;
		}
		const defaultError: ApiError = {
			requestId: `local-${nanoid(8)}`,
			timestamp: new Date().toISOString(),
			message: "An unexpected error occurred during get recommendations request"
		};
		throw defaultError;
	}
}

export interface SubscribeRecommendationsData {
	sub: string; // comma separated list of recommendation ids
	email: string;
}

export async function subscribeRecommendations(data: SubscribeRecommendationsData[]): Promise<ApiResult> {
	try {
		return (
			await apiV1<ApiSuccess>({
				method: "post",
				data: JSON.stringify(data),
				url: ENDPOINTS.recommendationsSubscribe
			})
		).data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const errorResponse = error.response?.data as ApiError;
			const customError: ApiError = {
				timestamp: errorResponse?.timestamp,
				requestId: errorResponse?.requestId,
				message: errorResponse?.message || "An error occurred during subscription"
			};
			return customError;
		}
		return {
			requestId: `local-${nanoid(8)}`,
			timestamp: new Date().toISOString(),
			message: "An unexpected error occurred during subscribe to recommendations api request"
		} as ApiError;
	}
}
