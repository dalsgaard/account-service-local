import amqplib from 'amqplib';

const EXCHANGE = 'account-events';
const QUEUE = 'account-service-local';

const connection = await amqplib.connect(process.env.AMQP_URL ?? 'amqp://localhost');
const channel = await connection.createChannel();

await channel.assertExchange(EXCHANGE, 'topic', { durable: true });
await channel.assertQueue(QUEUE, { durable: true });
await channel.bindQueue(QUEUE, EXCHANGE, '#');

console.log(`Listening on '${QUEUE}'...`);

channel.consume(QUEUE, (msg) => {
  if (!msg) return;
  console.log(`[${msg.fields.routingKey}]`, JSON.parse(msg.content.toString()));
  channel.ack(msg);
});
