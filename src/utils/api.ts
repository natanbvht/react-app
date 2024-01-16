import axios from "axios";
import { nanoid } from "nanoid";
import { getEnv, Environments } from "./config";

const ApiHost =
	getEnv() === Environments.PRODUCTION ? "https://api.metronai.com/api/v1" : "http://localhost:8080/api/v1";
const apiV1 = {
	subscribe: `${ApiHost}/metaintro/subscribe/sendgrid`
};
const MAX_TIMEOUT = 5000;
const DefaultHeaders = {
	"X-Request-ID": nanoid(8),
	"Content-Type": "application/json",
	"X-Session-Language": navigator.language,
	"Access-Control-Allow-Origin": `${window.location.origin}`,
	"X-Session-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
} as Record<string, string>;

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
interface ApiError {
	message: string;
	timestamp: string;
	requestId: string;
}
interface SubscribeResponse {
	message: string;
	trackingId: string;
}
type SubscribeFunctionResponse = SubscribeResponse | ApiError;
/**
 * Subscribes to newsletter.
 * @param {SubscribeData} subscribeData - Data for the subscription.
 * @returns {Promise<SubscribeFunctionResponse>} - The response from the subscription API.
 * @example subscribe({ email: " ", utm_source: " ", utm_medium: " " });
 */
export async function subscribe(subscribeData: SubscribeData): Promise<SubscribeFunctionResponse> {
	try {
		const response = await axios.put<SubscribeResponse>(`${apiV1.subscribe}`, JSON.stringify(subscribeData), {
			timeout: MAX_TIMEOUT,
			headers: DefaultHeaders
		});

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const errorResponse = error.response?.data as ApiError;
			const customError: ApiError = {
				timestamp: errorResponse.timestamp,
				requestId: errorResponse.requestId,
				message: errorResponse.message || "An error occurred during subscription"
			};
			return customError;
		}
		return {
			requestId: `local-${nanoid(8)}`,
			timestamp: new Date().toISOString(),
			message: "An unexpected error occurred"
		};
	}
}
