import { Kafka } from "kafkajs"

export const userAccountKafka = new Kafka({
  clientId: 'user_account',
  brokers: [
    process.env.BROKER_URL!
  ]
})