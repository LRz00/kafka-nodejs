import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "newsletter-producer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

export async function connectProducer() {
  await producer.connect();
  console.info("Kafka Producer Connected");
}

export async function publishEvent(topic: string, message: unknown) {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
}
