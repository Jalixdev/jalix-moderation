"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleVoiceStateUpdateEvent = void 0;
/**
 * @handler Voice Events
 * @related voiceStateUpdate
 */
function handleVoiceStateUpdateEvent(client, oldState, newState) {
    return __awaiter(this, void 0, void 0, function () {
        var emitted, oldMember, newMember, muteType, muteType, deafType, deafType;
        return __generator(this, function (_a) {
            emitted = false;
            oldMember = oldState.member;
            newMember = newState.member;
            /**
             * @event voiceChannelJoin
             * @description Emitted when a member joins a voice channel.
             * @param {DJS:GuildMember} member The member who joined the voice channel.
             * @param {DJS:VoiceChannel} voiceChannel The joined voice channel.
             * @example
             * client.on("voiceChannelJoin", (member, channel) => {
             *   console.log(member.user.tag+" joined "+channel.name+"!");
             * });
             */
            if (!oldState.channel && newState.channel) {
                client.emit('voiceChannelJoin', newMember, newState.channel);
                emitted = true;
            }
            /**
             * @event voiceChannelLeave
             * @description Emitted when a member leaves a voice channel.
             * @param {DJS:GuildMember} member The member who left the voice channel.
             * @param {DJS:VoiceChannel} voiceChannel The left voice channel.
             * @example
             * client.on("voiceChannelLeave", (member, channel) => {
             *   console.log(member.user.tag+" left "+channel.name+"!");
             * });
             */
            if (oldState.channel && !newState.channel) {
                client.emit('voiceChannelLeave', newMember, oldState.channel);
                emitted = true;
            }
            /**
             * @event voiceChannelSwitch
             * @description Emitted when a member switches to another voice channel.
             * @param {DJS:GuildMember} member The member who switched to another voice channel.
             * @param {DJS:VoiceChannel} voiceChannel The old voice channel.
             * @param {DJS:VoiceChannel} voiceChannel The new voice channel.
             * @example
             * client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {
             *   console.log(member.user.tag+" left "+oldChannel.name+" and joined "+newChannel.name+"!");
             * });
             */
            if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
                client.emit('voiceChannelSwitch', newMember, oldState.channel, newState.channel);
                emitted = true;
            }
            /**
             * @event voiceChannelMute
             * @description Emitted when a member becomes muted (self-muted or server-muted).
             * @param {DJS:GuildMember} member The member who became muted.
             * @param {boolean} muteType The mute type. It can be "self-muted" or "server-muted".
             * @example
             * client.on("voiceChannelMute", (member, muteType) => {
             *   console.log(member.user.tag+" become muted! (type: "+muteType);
             * });
             */
            if (!oldState.mute && newState.mute) {
                muteType = newState.selfMute ? 'self-muted' : 'server-muted';
                client.emit('voiceChannelMute', newMember, muteType);
                emitted = true;
            }
            /**
             * @event voiceChannelUnmute
             * @description Emitted when a member becomes unmuted.
             * @param {DJS:GuildMember} member The member who became unmuted.
             * @param {boolean} muteType The old mute type. It can be "self-muted" or "server-muted".
             * @example
             * client.on("voiceChannelUnmute", (member, oldMuteType) => {
             *   console.log(member.user.tag+" become unmuted!");
             * });
             */
            if (oldState.mute && !newState.mute) {
                muteType = oldState.selfMute ? 'self-muted' : 'server-muted';
                client.emit('voiceChannelUnmute', newMember, muteType);
                emitted = true;
            }
            /**
             * @event voiceChannelDeaf
             * @description Emitted when a member becomes deafed.
             * @param {DJS:GuildMember} member The member who became deafed.
             * @param {boolean} deafType The deaf type. It can be "self-deafed" or "server-deafed".
             * @example
             * client.on("voiceChannelDeaf", (member, deafType) => {
             *   console.log(member.user.tag+" become deafed!");
             * });
             */
            if (!oldState.deaf && newState.deaf) {
                deafType = newState.selfDeaf ? 'self-deafed' : 'server-v';
                client.emit('voiceChannelDeaf', newMember, deafType);
                emitted = true;
            }
            /**
             * @event voiceChannelUndeaf
             * @description Emitted when a member becomes undeafed.
             * @param {DJS:GuildMember} member The member who became undeafed.
             * @param {boolean} deafType The deaf type. It can be "self-deafed" or "server-deafed".
             * @example
             * client.on("voiceChannelUndeaf", (member, deafType) => {
             *   console.log(member.user.tag+" become undeafed!");
             * });
             */
            if (oldState.deaf && !newState.deaf) {
                deafType = oldState.selfDeaf ? 'self-deafed' : 'server-v';
                client.emit('voiceChannelUndeaf', newMember, deafType);
                emitted = true;
            }
            /**
             * @event voiceStreamingStart
             * @description Emitted when a member starts streaming.
             * @param {DJS:GuildMember} member The member who started streaming.
             * @param {DJS:VoiceChannel} voiceChannel The channel in which the member is streaming.
             * @example
             * client.on("voiceStreamingStart", (member, voiceChannel) => {
             *   console.log(member.user.tag+" started streaming in "+voiceChannel.name);
             * });
             */
            if (!oldState.streaming && newState.streaming) {
                client.emit('voiceStreamingStart', newMember, newState.channel);
                emitted = true;
            }
            /**
             * @event voiceStreamingStop
             * @description Emitted when a member stops streaming.
             * @param {DJS:GuildMember} member The member who stopped streaming.
             * @param {DJS:VoiceChannel} voiceChannel The channel in which the member was streaming.
             * @example
             * client.on("voiceStreamingStop", (member, voiceChannel) => {
             *   console.log(member.user.tag+" stopped streaming");
             * });
             */
            if (oldState.streaming && !newState.streaming) {
                client.emit('voiceStreamingStop', newMember, newState.channel);
                emitted = true;
            }
            /**
             * @event unhandledVoiceStateUpdate
             * @description Emitted when the voiceStateUpdate event is triggered but discord-logs didn't trigger any custom event.
             * @param {DJS:VoiceState} oldState The voice state before the update.
             * @param {DJS:VoiceState} newState The voice state after the update.
             * @example
             * client.on("unhandledVoiceStateUpdate", (oldState, newState) => {
             *   console.log("Voice state for member '"+oldState.member.user.tag+"' was updated but discord-logs couldn't find what was updated...");
             * });
             */
            if (!emitted) {
                client.emit('unhandledVoiceStateUpdate', oldState, newState);
            }
            return [2 /*return*/];
        });
    });
}
exports.handleVoiceStateUpdateEvent = handleVoiceStateUpdateEvent;
