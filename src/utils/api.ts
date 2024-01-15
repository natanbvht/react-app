import axios from "axios";
import { nanoid } from "nanoid";
import { getEnv, Environments } from "./config";

const apiV1 = getEnv() === Environments.PRODUCTION ? "https://api.metronai.com/api/v1" : "http://localhost:8080/api/v1";

const DefaultHeaders = {
	"X-Request-ID": nanoid(8),
	"Content-Type": "application/json",
	"X-Session-Language": navigator.language,
	"Access-Control-Allow-Origin": `${window.location.origin}`,
	"X-Session-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
} as Record<string, string>;

export interface SubscribeJobData {
	email: string;
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error?: any;
	requestId?: string;
	timestamp?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function subscribe(subscribeData: SubscribeJobData): Promise<any> {
	try {
		const response = await axios.put(`${apiV1}/metaintro/subscribe/sendgrid`, JSON.stringify(subscribeData), {
			timeout: 5000,
			headers: DefaultHeaders
		});

		return response;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return error;
	}
};
