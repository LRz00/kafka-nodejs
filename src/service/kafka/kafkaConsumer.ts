import { Kafka } from "kafkajs";
import logger from "../../logger";

const kafka = new Kafka({
    clientId: "newsletter-consumer",
    brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "newsletter-group" });


//consumer q ouve o topico "sock events"

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
                //add db logic
            }
        }
    });
}

runConsumer().catch(console.error)