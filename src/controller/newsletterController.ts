import { Request, Response } from "express";
import { publishEvent } from "../service/kafka/kafkaProducer";
import logger from "../logger";

export async function subscribe(req: Request, res: Response) {
  try {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      logger.error("Invalid data");
      return res.status(400).json({ error: "Invalid Information" });
    }

    const event = {
      fullName,
      email,
      subscribedAt: new Date().toISOString(),
    };

    await publishEvent("newsletter-events", event);
    logger.info(`Event Published: ${JSON.stringify(event)}`)

    return res.status(200).json({ status: "ok", event });
  } catch (e) {
    logger.error(`Error sending message: " ${e}`);
    return res.status(500).json({ error: "Internal Error" });
  }
}
