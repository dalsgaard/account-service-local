import { randomUUID } from 'crypto';
import { createAccountServiceAmqpClient } from '../asyncapi/generated/account-service-amqp-client';

const client = await createAccountServiceAmqpClient({
  url: process.env.AMQP_URL ?? 'amqp://localhost',
});

await client.sendAccountCreated({
  id: randomUUID(),
  name: 'Test Account',
  iban: 'DK5000400440116243',
  currency: 'DKK',
  customerId: randomUUID(),
});

console.log('account.created sent');
await client.close();
