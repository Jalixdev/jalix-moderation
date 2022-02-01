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
exports.handlePresenceUpdateEvent = void 0;
/**
 * @handler Presence Events
 * @related presenceUpdate
 */
function handlePresenceUpdateEvent(client, oldPresence, newPresence) {
    return __awaiter(this, void 0, void 0, function () {
        var emitted;
        return __generator(this, function (_a) {
            if (!oldPresence)
                return [2 /*return*/];
            emitted = false;
            /**
             * @event guildMemberOffline
             * @description Emitted when a member becomes offline.
             * @param {DJS:GuildMember} member The member who became offline.
             * @param {DJST:Status} oldStatus The old member status, it can be "dnd", "idle" or "online".
             * @example
             * client.on("guildMemberOffline", (member, oldStatus) => {
             *   console.log(member.user.tag+" became offline!");
             * });
             */
            if (oldPresence.status !== 'offline' && newPresence.status === 'offline') {
                client.emit('guildMemberOffline', newPresence.member, oldPresence.status);
                emitted = true;
            }
            /**
             * @event guildMemberOnline
             * @description Emitted when a member becomes online, dnd or idle.
             * @param {DJS:GuildMember} member The member who became online.
             * @param {DJST:Status} newStatus The new member status, it can be "dnd", "idle" or "online".
             * @example
             * client.on("guildMemberOnline", (member, newStatus) => {
             *   console.log(member.user.tag+" was offline and is now "+newStatus+"!");
             * });
             */
            if (oldPresence.status === 'offline' && newPresence.status !== 'offline') {
                client.emit('guildMemberOnline', newPresence.member, newPresence.status);
                emitted = true;
            }
            /**
             * @event unhandledPresenceUpdate
             * @description Emitted when the presenceUpdate event is triggered but discord-logs didn't trigger any custom event.
             * @param {DJS:Presence} oldPresence The presence before the update.
             * @param {DJS:Presence} newPresence The presence after the update.
             * @example
             * client.on("unhandledPresenceUpdate", (oldPresence, newPresence) => {
             *   console.log("Presence for member "+oldPresence.member.user.tag+"' was updated but discord-logs couldn't find what was updated...");
             * });
             */
            if (!emitted) {
                client.emit('unhandledPresenceUpdate', oldPresence, newPresence);
            }
            return [2 /*return*/];
        });
    });
}
exports.handlePresenceUpdateEvent = handlePresenceUpdateEvent;
