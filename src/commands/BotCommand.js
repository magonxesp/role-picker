import { BotClient } from "../bot";

/**
 * BotCommand class
 *
 * @interface
 */
export default class BotCommand {

    /**
     * BotCommand constructor
     */
    constructor() {

    }

    /**
     * Return the command name whitout prefix
     *
     * @abstract
     * @returns {string}
     */
    get name() {
        throw new Error('not implemented');
    }

    /**
     * Return the command description
     *
     * @abstract
     * @returns {string}
     */
    get description() {
        throw new Error('not implemented');
    }

    /**
     * Return the usage of the command
     *
     * @returns {string}
     */
    get usage() {
        return '';
    }

    /**
     * Return the required permissions for execute the command
     *
     * @returns {Array<PermissionResolvable>}
     */
    get permissions() {
        return []
    }

    /**
     * Return if command is always enabled
     *
     * @return {boolean}
     */
    get alwaysEnabled() {
        return false;
    }

    /**
     * On command loaded
     */
    onLoad() { }

    /**
     * Run command
     *
     * @param {Message} message
     * @param {Array<string>} args
     * @abstract
     */
    async run(message, args) {
        throw new Error('not implemented');
    }

    /**
     * Get command response messages strings
     *
     * @param {string} commandClass
     *
     * @return {object}
     */
    getResponseMessages(commandClass) {
        return BotClient.config["command_responses"][commandClass];
    }

    /**
     * Returns command arguments help
     *
     * @param {Array<{name: string, required: boolean}>} args
     */
    arguments(args) {
        let help = [];

        for (let arg of args) {
            if (arg.required) {
                help.push(`${arg.name}`);
            } else {
                help.push(`[${arg.name}]`);
            }
        }

        return help.join(' ');
    }

}