import { Client } from "discord.js";
import { root } from "./settings";
import fs from "fs";
import path from "path";
import BotCommand from "./commands/BotCommand";
import RunCommand from "./commands/RunCommand";


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
                const commandExecutor = new RunCommand(command.command);
                await commandExecutor.execute(message, commandArgs);
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
 * BotClient instance
 *
 * @type {BotClient}
 */
export const bot = new BotClient();
