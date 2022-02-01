import { Client, GuildMember, PartialGuildMember } from 'discord.js';
/**
 * @handler Guild Member Events
 * @related guildMemberUpdate
 */
export declare function handleGuildMemberUpdateEvent(client: Client, oldMember: GuildMember | PartialGuildMember, newMember: GuildMember): Promise<void>;
