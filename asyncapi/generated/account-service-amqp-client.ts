// Generated — do not edit manually

import amqplib from "amqplib";
import type { AccountServiceClient } from "./account-service";
export type AccountServiceAmqpClientConfig = {
    url: string;
};
export async function createAccountServiceAmqpClient(config: AccountServiceAmqpClientConfig): Promise<AccountServiceClient & {
    close: () => Promise<void>;
}> {
    const connection = await amqplib.connect(config.url);
    const channel = await connection.createConfirmChannel();
    await channel.assertExchange("account-events", "topic", { durable: true });
    return {
        sendAccountCreated: async (accountCreated) => {
            channel.publish("account-events", "account-created", Buffer.from(JSON.stringify(accountCreated)));
            await channel.waitForConfirms();
        },
        sendAccountUpdated: async (accountUpdated) => {
            channel.publish("account-events", "account-updated", Buffer.from(JSON.stringify(accountUpdated)));
            await channel.waitForConfirms();
        },
        sendAccountDeleted: async (accountDeleted) => {
            channel.publish("account-events", "account-deleted", Buffer.from(JSON.stringify(accountDeleted)));
            await channel.waitForConfirms();
        },
        close: async () => {
            await connection.close();
        }
    };
}
