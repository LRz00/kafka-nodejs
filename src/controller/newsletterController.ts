import { Request, Response } from "express";
import { publishEvent } from "../service/kafkaService";

export async function subscribe(req: Request, res: Response) {
  try {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      console.error("Invalid data");
      return res.status(400).json({ error: "Invalid Information" });
    }

    const event = {
      fullName,
      email,
      subscribedAt: new Date().toISOString(),
    };

    await publishEvent("newsletter-events", event);
    console.info("Event Published:", event);

    return res.status(200).json({ status: "ok", event });
  } catch (e) {
    console.error("Error sending message", e);
    return res.status(500).json({ error: "Internal Error" });
  }
}
