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
exports.handleRoleUpdateEvent = void 0;
/**
 * @handler Role Events
 * @related roleUpdate
 */
function handleRoleUpdateEvent(client, oldRole, newRole) {
    return __awaiter(this, void 0, void 0, function () {
        var emitted;
        return __generator(this, function (_a) {
            emitted = false;
            /**
             * @event rolePositionUpdate
             * @description Emitted when a role position changes.
             * @param {DJS:Role} role The role whose position has changed.
             * @param {number} oldPosition The old role position.
             * @param {number} newPosition The new role position.
             * @example
             * client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {
             *   console.log(role.name + " was at position "+oldPosition+" and now is at position "+newPosition);
             * });
             */
            if (oldRole.rawPosition !== newRole.rawPosition) {
                client.emit('rolePositionUpdate', newRole, oldRole.rawPosition, newRole.rawPosition);
                emitted = true;
            }
            /**
             * @event rolePermissionsUpdate
             * @description Emitted when a role permissions changes.
             * @param {DJS:Role} role The role whose permissions has changed.
             * @param {number} oldPermissions The old role permissions.
             * @param {number} newPermissions The new role permissions.
             * @example
             * client.on("rolePermissionsUpdate", (role, oldPermissions, newPermissions) => {
             *   console.log(role.name + " had as permissions "+oldPermissions+" and now has as permissions "+newPermissions);
             * });
             */
            if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
                client.emit('rolePermissionsUpdate', newRole, oldRole.permissions.bitfield, newRole.permissions.bitfield);
                emitted = true;
            }
            /**
             * @event unhandledRoleUpdate
             * @description Emitted when the roleUpdate event is triggered but discord-logs didn't trigger any custom event.
             * @param {DJS:Role} oldRole The role before the update.
             * @param {DJS:Role} newRole The role after the update.
             * @example
             * client.on("unhandledRoleUpdate", (oldRole, newRole) => {
             *   console.log("Role '"+oldRole.id+"' was updated but discord-logs couldn't find what was updated...");
             * });
             */
            if (!emitted) {
                client.emit('unhandledRoleUpdate', oldRole, newRole);
            }
            return [2 /*return*/];
        });
    });
}
exports.handleRoleUpdateEvent = handleRoleUpdateEvent;
