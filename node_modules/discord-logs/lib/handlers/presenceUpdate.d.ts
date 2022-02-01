import { Client, Presence } from 'discord.js';
/**
 * @handler Presence Events
 * @related presenceUpdate
 */
export declare function handlePresenceUpdateEvent(client: Client, oldPresence: Presence | null | undefined, newPresence: Presence): Promise<void>;
