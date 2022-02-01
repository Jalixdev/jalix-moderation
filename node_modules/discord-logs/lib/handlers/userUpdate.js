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
exports.handleUserUpdateEvent = void 0;
/**
 * @handler User Events
 * @related userUpdate
 */
function handleUserUpdateEvent(client, oldUser, newUser) {
    return __awaiter(this, void 0, void 0, function () {
        var emitted;
        return __generator(this, function (_a) {
            emitted = false;
            if (!oldUser.partial) {
                /**
                 * @event userAvatarUpdate
                 * @description Emitted when a user changes their avatar.
                 * @param {DJS:User} user The user who changed their avatar.
                 * @param {string} oldAvatarURL The old avatar url.
                 * @param {string} newAvatarURL The new avatar url.
                 * @example
                 * client.on("userAvatarUpdate", (user, oldAvatarURL, newAvatarURL) => {
                 *   console.log(user.tag+" avatar updated!");
                 * });
                 */
                if (oldUser.displayAvatarURL() !== newUser.displayAvatarURL()) {
                    client.emit('userAvatarUpdate', newUser, oldUser.displayAvatarURL(), newUser.displayAvatarURL());
                    emitted = true;
                }
                /**
                 * @event userUsernameUpdate
                 * @description Emitted when a user changes their username.
                 * @param {DJS:User} user The user who changed their username.
                 * @param {string} oldUsername The old username.
                 * @param {string} newUsername The new username.
                 * @example
                 * client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {
                 *   console.log(user.tag+" username updated!");
                 * });
                 */
                if (oldUser.username !== newUser.username) {
                    client.emit('userUsernameUpdate', newUser, oldUser.username, newUser.username);
                    emitted = true;
                }
                /**
                 * @event userDiscriminatorUpdate
                 * @description Emitted when a user changes their discriminator.
                 * @param {DJS:User} user The user who changed their discriminator.
                 * @param {string} oldDiscriminator The old discriminator.
                 * @param {string} newDiscriminator The new discriminator.
                 * @example
                 * client.on("userDiscriminatorUpdate", (user, oldDiscriminator, newDiscriminator) => {
                 *   console.log(user.tag+" discriminator updated!");
                 * });
                 */
                if (oldUser.discriminator !== newUser.discriminator) {
                    client.emit('userDiscriminatorUpdate', newUser, oldUser.discriminator, newUser.discriminator);
                    emitted = true;
                }
                /**
                 * @event userFlagsUpdate
                 * @description Emitted when a user changes their flags.
                 * @param {DJS:User} user The user who changed their flags.
                 * @param {string} oldFlags The old flags.
                 * @param {string} newFlags The new flags.
                 * @example
                 * client.on("userFlagsUpdate", (user, oldFlags, newFlags) => {
                 *   console.log(user.tag+" flags updated!");
                 * });
                 */
                if (oldUser.flags !== newUser.flags) {
                    client.emit('userFlagsUpdate', newUser, oldUser.flags, newUser.flags);
                    emitted = true;
                }
            }
            /**
             * @event unhandledUserUpdate
             * @description Emitted when the userUpdate event is triggered but discord-logs didn't trigger any custom event.
             * @param {DJS:User} oldUser The user before the update.
             * @param {DJS:User} newUser The user after the update.
             * @example
             * client.on("unhandledUserUpdate", (oldUser, newUser) => {
             *   console.log("User '"+oldUser.id+"' was updated but discord-logs couldn't find what was updated...");
             * });
             */
            if (!emitted) {
                client.emit('unhandledUserUpdate', oldUser, newUser);
            }
            return [2 /*return*/];
        });
    });
}
exports.handleUserUpdateEvent = handleUserUpdateEvent;
