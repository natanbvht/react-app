/* eslint-disable no-console */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { nanoid } from "nanoid";
import { IpLocation } from "../types.d";
import { getEnv, Environments, MOCK_API_DEBUG, MOCK_API_FLAG } from "../config";

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

const DEFAULT_HEADERS = {
	"X-Session-CC": "US",
	"X-Request-ID": nanoid(8),
	"Content-Type": "application/json",
	"X-Session-Language": navigator.language,
	"Access-Control-Allow-Origin": `${window?.location?.origin}`, // Enable CORS
	"X-Session-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
} as Record<string, string>;

function isApiError(response: unknown) {
	return (response as ApiError).message !== undefined;
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

async function apiV1<T>(options: AxiosRequestConfig, mockError: boolean = false): Promise<AxiosResponse<T>> {
	const fullUrl = options.url?.startsWith("http") ? options.url : `${API_HOST}${options.url}`;
	const mergedOptions = {
		...options,
		url: fullUrl,
		method: options.method || "get",
		timeout: options.timeout || MAX_TIMEOUT,
		headers: { ...DEFAULT_HEADERS, ...options.headers }
	};

	if (MOCK_API_FLAG) {
		const mockData = await getMockResponse<T>(mergedOptions, mockError);
		if (MOCK_API_DEBUG) console.debug("Mock data", mockData);
		return Promise.resolve(mockData as AxiosResponse<T>);
	}
	return axios(mergedOptions);
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
	const requestOptions: AxiosRequestConfig = {
		method: "put",
		url: ENDPOINTS.subscribe,
		data: JSON.stringify(data)
	};

	try {
		const response = await apiV1<ApiResult>(requestOptions);
		return response.data;
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

export interface Recommendation {
	_id: string;
	sub: string;
	cta?: string;
	logo: string;
	name: string;
	sponsored?: boolean;
	description: string;
}

type RecommendationsResponse = Recommendation[] | ApiError;

/**
 * Gets recommendations.
 * @returns {Promise<RecommendationsResponse>} - The response from the recommendations API.
 * @example await getRecommendations();
 */
export async function getRecommendations(): Promise<RecommendationsResponse> {
	try {
		const response = await apiV1<RecommendationsResponse>({ url: ENDPOINTS.recommendations });
		return response.data;
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
	const requestOptions: AxiosRequestConfig = {
		method: "post",
		data: JSON.stringify(data),
		url: ENDPOINTS.recommendationsSubscribe
	};

	try {
		const response = await apiV1<ApiResult>(requestOptions);
		return response.data;
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

type IpLocationResponse = IpLocation | ApiError;
export async function getIpLocation(): Promise<IpLocationResponse> {
	try {
		const response = await apiV1<IpLocationResponse>({ url: ENDPOINTS.ipLocation });
		if (isApiError(response.data)) {
			return response.data as ApiError;
		}
		return response.data as IpLocation;
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
