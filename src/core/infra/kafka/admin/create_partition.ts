import { Kafka } from 'kafkajs'

createPartition()
async function createPartition () {
  const kafka = new Kafka({
    clientId: 'user-moz',
    brokers: [
      process.env.BROKER_URL!
    ]
  })

  const admin = kafka.admin()

  await admin.connect()

  await admin.createTopics({
    topics: [
      {
        topic: 'USER_TAGS',
        numPartitions: 2
      }
    ]
  })

  await admin.disconnect()
  console.log('Topic created successfully!')
}
