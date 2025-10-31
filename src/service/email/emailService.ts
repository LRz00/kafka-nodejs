import dotenv from "dotenv";
import axios from "axios";
import { EmailPayload } from "../../types";
import logger from "../../logger";


dotenv.config();

const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN;
const MAILTRAP_URL = "https://send.api.mailtrap.io/api/send";
const DOMAIN_EMAIL: string = process.env.MAILTAP_DOMAIN || "";

export async function sendConfirmationEmail(to: string, toName: string) {
    const payload: EmailPayload = {
        from: {
            email: DOMAIN_EMAIL, 
            name: "Newsletter Service",
        },
        to: [ {email: to, name: toName} ],
        subject: "Subscription Confirmation",
        text: `Hello ${toName},\n\nThank you for subscribing to our newsletter!`,
        html: `<p>Hello ${toName},</p><p>Thank you for subscribing to our newsletter!</p>`,
        category: "subscription",
    }

    try{
        const response = await axios.post(MAILTRAP_URL, payload, {
            headers: {
                Authorization: `Bearer ${MAILTRAP_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

        logger.info("Confirmation email sent:", response.data)
    }catch(error: any){
        logger.error("Error sending confirmation email:", error.response?.data || error.message);
        throw error;
    }
}

