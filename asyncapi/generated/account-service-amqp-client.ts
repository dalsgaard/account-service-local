// Generated — do not edit manually

import amqplib from "amqplib";
import type { AccountServiceClient } from "./account-service";
export type AccountServiceAmqpClientConfig = {
    url: string;
    exchange: string;
};
export async function createAccountServiceAmqpClient(config: AccountServiceAmqpClientConfig): Promise<AccountServiceClient> {
    const connection = await amqplib.connect(config.url);
    const channel = await connection.createChannel();
    return {
        sendAccountCreated: async (accountCreated) => {
            channel.publish(config.exchange, "account-created", Buffer.from(JSON.stringify(accountCreated)));
        },
        sendAccountUpdated: async (accountUpdated) => {
            channel.publish(config.exchange, "account-updated", Buffer.from(JSON.stringify(accountUpdated)));
        },
        sendAccountDeleted: async (accountDeleted) => {
            channel.publish(config.exchange, "account-deleted", Buffer.from(JSON.stringify(accountDeleted)));
        }
    };
}
