import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "stock-consumer",
    brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "stock-group" });


//consumer q ouve o topico "sock events"

async function runConsumer() {
    await consumer.connect();
    await consumer.subscribe({
        topic: "stock-events",
        fromBeginning: true
    });

    console.info("Listening to stock events");

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message.value) {
                const event = JSON.parse(message.value.toString());
                console.info("Event received: ", event);

                if (event.type === "ADD") {
                    console.info(`${event.productId}: +${event.quantity}`);
                } else if (event.type === "REMOVE") {
                    console.info(`${event.productId}: -${event.quantity}`);
                }
            }
        }
    });
}

runConsumer().catch(console.error)