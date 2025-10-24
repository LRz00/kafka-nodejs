import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import logger from "../../logger";
import dotenv from "dotenv";

dotenv.config();

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

logger.info(`DynamoDB Client configured for region: ${process.env.AWS_REGION}`);

export default dynamoClient;
