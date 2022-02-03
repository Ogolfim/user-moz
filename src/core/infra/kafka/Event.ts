import { RecordMetadata } from 'kafkajs'
import { userAccountKafka } from './config'
import { Kay } from './Key'
import { Topic } from './Topic'



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
