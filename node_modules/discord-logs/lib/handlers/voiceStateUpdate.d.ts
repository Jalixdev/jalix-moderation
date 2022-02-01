import { Client, VoiceState } from 'discord.js';
/**
 * @handler Voice Events
 * @related voiceStateUpdate
 */
export declare function handleVoiceStateUpdateEvent(client: Client, oldState: VoiceState, newState: VoiceState): Promise<void>;
