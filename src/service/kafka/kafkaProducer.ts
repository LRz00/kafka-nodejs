import { Kafka } from "kafkajs";
import logger from "../../logger";

const kafka = new Kafka({
  clientId: "newsletter-producer",
  brokers: ["localhost:9092"],
});

const kafkaProducer = kafka.producer();

export async function connectProducer() {
  await kafkaProducer.connect();
  logger.info("Kafka Producer Connected");
}

export async function publishEvent(topic: string, message: unknown) {
  await kafkaProducer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
}

export { kafkaProducer };
