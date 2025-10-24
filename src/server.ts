import { error } from "console";
import express from "express";
import { Kafka } from "kafkajs";

interface User {
    fullName: string;
    email: string;
    subscribedAt: string;
}

//incializando o cliente kafka:

const kafka = new Kafka({
    clientId: "newsletter-producer",
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


app.post("/subscribe", async (req, res) => {
    try {
        const { fullName, email} = req.body;
        if (!fullName || !email) {
            console.error("Error related to received information")
            return res.status(400).json({ error: "Invalid Information" });
        }

        const event: User = {
            fullName,
            email,
            subscribedAt: new Date().toISOString(),
        }

        await producer.send({
            topic: "newsletter-events",
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