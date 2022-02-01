import { Client, Guild } from 'discord.js';
/**
 * @handler Guild Events
 * @related guildUpdate
 */
export declare function handleGuildUpdateEvent(client: Client, oldGuild: Guild, newGuild: Guild): Promise<void>;
