import { Kafka } from "kafkajs";
import logger from "../../logger";

const kafka = new Kafka({
  clientId: "newsletter-producer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

export async function connectProducer() {
  await producer.connect();
  logger.info("Kafka Producer Connected");
}

export async function publishEvent(topic: string, message: unknown) {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
}
