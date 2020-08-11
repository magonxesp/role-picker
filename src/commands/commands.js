import HelloCommand from "./HelloCommand";
import SelectChannelCommand from './SelectChannelCommand';

/**
 * Bot commands
 *
 * @type {Array<BotCommand>}
 */
const commands = [
    new HelloCommand(),
    new SelectChannelCommand(),
];

/**
 * Get the bot commands instances
 *
 * @return {Array<BotCommand>}
 */
export default function botCommands() {
    return commands;
}