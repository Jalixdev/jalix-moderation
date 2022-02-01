import { Channel, Client } from 'discord.js';
/**
 * @handler Channel Events
 * @related channelUpdate
 */
export declare function handleChannelUpdateEvent(client: Client, oldChannel: Channel, newChannel: Channel): Promise<void>;
