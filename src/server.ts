import { error } from "console";
import express from "express";
import { Kafka } from "kafkajs";

interface StockEvent {
    productId: string;
    quantity: number;
    type: "ADD" | "REMOVE";
    timestamp: number;
}

//incializando o cliente kafka:

const kafka = new Kafka({
    clientId: "stock-producer",
    brokers: ["localhost:9092"],
});

const producer = kafka.producer();

async function initKafka() {
    await producer.connect();
    console.info("Kafka Producer Connected")
}

const app = express();

app.use(express.json());

/*
    Controller
*/


app.post("/stock", async (req, res) => {
    try {
        const { productId, quantity, type } = req.body;
        if (!productId || !quantity || !["ADD", "REMOVE"].includes(type)) {
            console.error("Error related to received information")
            return res.status(400).json({ error: "Invalid Information" });
        }

        const event: StockEvent = {
            productId,
            quantity,
            type,
            timestamp: Date.now()
        }

        await producer.send({
            topic: "stock-events",
            messages:[{value: JSON.stringify(event)}],
        });

        console.info("Event Published:", event);

        res.status(200).json({status: "ok", event});
    } catch (e) {
        console.error("Error sending message", e);
        res.status(500).json({error: "Internal Error"})
    }
});


//server init

app.listen(3000, async()=> {
    await initKafka();
    console.info("Server running on port 3000")
})