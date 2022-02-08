import { RecordMetadata } from 'kafkajs'
import { userAccountKafka } from '@core/infra/kafka/config'
import { Kay } from '@core/infra/kafka/key'
import { Topic } from '@core/infra/kafka/topic'

export interface UserAccountEvent {
  topic: Topic,
  key: Kay
  value: string | Buffer | null
}

export const accountEventProducer = async ({ topic, key, value }: UserAccountEvent): Promise<RecordMetadata[]> => {
  const producer = userAccountKafka.producer()

  await producer.connect()

  const result = await producer.send({
    topic,
    messages: [
      {
        key,
        value
      }
    ]
  })

  await producer.disconnect()

  return result
}
