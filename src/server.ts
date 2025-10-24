import app from "./app";
import logger from "./logger";
import { connectProducer } from "./service/kafka/kafkaProducer";
import "dotenv/config";
import * as dotenv from "dotenv";
dotenv.config(); 

app.listen(3000, async () => {
  await connectProducer();
  logger.info("Server running on port 3000");
});



