import HelloCommand from "./HelloCommand";
import SelectChannelCommand from './SelectChannelCommand';
import SelectRoleCommand from "./SelectRoleCommand";
import HelpCommand from "./HelpCommand";
import RoleListCommand from "./RoleListCommand";
import RemoveRoleCommand from "./RemoveRoleCommand";
import RemoveChannelCommand from "./RemoveChannelCommand";
import ExcludeRoleCommand from "./ExcludeRoleCommand";
import IncludeRoleCommand from "./IncludeRoleCommand";
import EnableCommand from "./EnableCommand";
import DisableCommand from "./DisableCommand";

/**
 * Bot commands
 *
 * @type {Array<BotCommand>}
 */
const commands = [
    new HelloCommand(),
    new SelectChannelCommand(),
    new SelectRoleCommand(),
    new RoleListCommand(),
    new HelpCommand(),
    new RemoveRoleCommand(),
    new RemoveChannelCommand(),
    new ExcludeRoleCommand(),
    new IncludeRoleCommand(),
    new EnableCommand(),
    new DisableCommand()
];

/**
 * Get the bot commands instances
 *
 * @return {Array<BotCommand>}
 */
export default function botCommands() {
    return commands;
}