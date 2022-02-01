import { Client, Role } from 'discord.js';
/**
 * @handler Role Events
 * @related roleUpdate
 */
export declare function handleRoleUpdateEvent(client: Client, oldRole: Role, newRole: Role): Promise<void>;
