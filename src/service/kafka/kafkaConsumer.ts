import { Kafka } from "kafkajs";
import logger from "../../logger";
import { saveSubscription } from "../dynamodb/newsletterRepository";
import { error } from "console";
import dotenv from "dotenv";
dotenv.config();

const kafka = new Kafka({
    clientId: "newsletter-consumer",
    brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "newsletter-group" });


async function runConsumer() {
    await consumer.connect();
    await consumer.subscribe({
        topic: "newsletter-events",
        fromBeginning: true
    });

    logger.info("Listening to newsletter subscription events");

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message.value) {
                const event = JSON.parse(message.value.toString());
                logger.info("Event received: ", event);
                try {
                    await saveSubscription(event);
                }catch(e){
                    logger.error({error}, "Failed to save even to DynamoDB")
                }
            }
        }
    });
}

runConsumer().catch(logger.error)