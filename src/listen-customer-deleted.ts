import { createCustomerDeletedAmqpListener } from '../asyncapi/generated/account-service-amqp-handlers';

const listener = await createCustomerDeletedAmqpListener(
  { url: process.env.AMQP_URL ?? 'amqp://localhost', queue: 'account-service-local' },
  async ({ id }) => {
    console.log('Customer deleted:', id);
  },
);

console.log('Listening for customer-deleted events...');

process.on('SIGINT', async () => {
  await listener.close();
  process.exit(0);
});
