![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka) ![AmazonDynamoDB](https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?style=for-the-badge&logo=Amazon%20DynamoDB&logoColor=white)

# Newsletter Subscription Service

Esta aplicação gerencia inscrições em uma newsletter utilizando Kafka para mensageria e DynamoDB como banco de dados.




## Tech Stack

**Server:** Node, Express

**Database**: DynamoDB

**Event Streaming**: Kafka


## Run Locally

Clone the project

```bash
  git clone https://github.com/LRz00/kafka-nodejs
```

Go to the project directory

```bash
  cd kafka-nodejs
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:server
```

Start the Kafka consumer

```bash
  npm run start:consumer
```


## Authors

- [@LRz00](https://github.com/LRz00)

