import app from "./app";
import { connectProducer } from "./service/kafkaService";

app.listen(3000, async () => {
  await connectProducer();
  console.info("Server running on port 3000");
});
