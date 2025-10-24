import { PutCommand } from "@aws-sdk/lib-dynamodb";
import dynamoClient from "./dynamoClient";
import logger from "../../logger";

const tableName = "NewsletterSubscribers";

export async function saveSubscription(event: Record<string, any>) {
    try {

        const item = {
            email: event.email, 
            fullName: event.fullName,
            subscribedAt: event.subscribedAt || new Date().toISOString(),
            createdAt: new Date().toISOString(),
        };

        const command = new PutCommand({
            TableName: tableName,
            Item: item,
            ConditionExpression: "attribute_not_exists(email)",
        });

        await dynamoClient.send(command);
        logger.info(`Subscription saved successfully for: ${event.email}`);
        return item;
    } catch (error: any) {
        if (error.name === 'ConditionalCheckFailedException') {
            logger.warn(`Subscription already exists for: ${event.email}`);
            return { message: "Subscription already exists" };
        } else {
            logger.error(`Error saving subscription for ${event.email}: ${error.message}`);
            logger.error(`Full error: ${JSON.stringify(error)}`);
            throw error;
        }
    }
}
