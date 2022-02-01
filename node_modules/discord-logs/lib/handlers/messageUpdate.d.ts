import { Client, Message, PartialMessage } from 'discord.js';
/**
 * @handler Message Events
 * @related messageUpdate
 */
export declare function handleMessageUpdateEvent(client: Client, oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage): Promise<void>;
