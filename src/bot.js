import { Client } from "discord.js";
import { root } from "./settings";
import fs from "fs";
import path from "path";


/**
 * BotClient Class
 */
export class BotClient extends Client {

    /**
     * Bot commands array
     *
     * @type {Array<{fullName: string, command: BotCommand}>}
     */
    #commands = [];

    /**
     * Bot configuration
     *
     * @type {Object}
     * @private
     */
    static #config = {};

    /**
     * BotClient constructor
     */
    constructor() {
        super();
        // setup event listeners
        this.on('message', this.#onMessage);
    }

    /**
     * Load bot configuration
     *
     * @return {Object}
     * @throws {Error}
     */
    static loadConfig() {
        const configPath = path.join(root, 'config', 'config.json');

        if (fs.existsSync(configPath)) {
            BotClient.#config = require(configPath);
        } else {
            throw new Error("config/config.json not exists!");
        }
    }

    static get config() {
        return BotClient.#config;
    }

    /**
     * Get bot commands
     *
     * @returns {Array<{fullName: string, command: BotCommand}>}
     */
    get commands() {
        return this.#commands;
    }

    /**
     * Get Event Message
     *
     * @param {string} event
     * @return {string}
     */
    static getEventMessage(event) {
        if (typeof BotClient.config['events_responses'][event] !== 'undefined') {
            return BotClient.config['events_responses'][event];
        }

        return '';
    }

    /**
     * Setup Event handlers
     *
     * @param {Array<{event: any, handler: EventHandler}>} handlers
     */
    setupEventListeners(handlers) {
        for (let eventHandler of handlers) {
            this.on(eventHandler.event, (...args) => eventHandler.handler.handle(...args))
        }
    }

    /**
     * On message event
     *
     * @param {Message} message
     * @private
     */
    async #onMessage(message) {
        if (message.content.includes(BotClient.#config.command_prefix)) {
            const commandArgs = message.content.split(" ");
            const commandName = commandArgs.shift(); // get command name and remove of args array
            const command = this.#commands.filter(command => command.fullName === commandName).shift();

            if (typeof command !== 'undefined') {
                await command.command.run(message, commandArgs);
            }
        }
    }

    /**
     * Set bot commands
     *
     * @param {Array<BotCommand>} commands
     */
    setCommands(commands) {
        for (let command of commands) {
            if (command instanceof BotCommand) {
                command.onLoad();

                this.#commands.push({
                    fullName: BotClient.#config.command_prefix + command.name,
                    command: command
                });
            }
        }
    }

}

/**
 * BotCommand class
 *
 * @interface
 */
export class BotCommand {

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
     * @abstract
     * @returns {string}
     */
    get usage() {
        return '';
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

/**
 * BotClient instance
 *
 * @type {BotClient}
 */
export const bot = new BotClient();
