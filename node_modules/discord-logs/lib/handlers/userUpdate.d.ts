import { Client, PartialUser, User } from 'discord.js';
/**
 * @handler User Events
 * @related userUpdate
 */
export declare function handleUserUpdateEvent(client: Client, oldUser: User | PartialUser, newUser: User): Promise<void>;
