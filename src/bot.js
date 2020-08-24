import { Client } from "discord.js";
import { root } from "./settings";
import fs from "fs";
import path from "path";
import {ServerTextChannel} from "./models";

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
            this.on(eventHandler.event, eventHandler.handler.handle)
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
            await command.command.run(message, commandArgs);
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
 */
export class BotCommand {

    /**
     * BotCommand constructor
     */
    constructor() {
        this.commandName = "";
    }

    /**
     * Return the command name whitout prefix
     *
     * @returns {string}
     */
    get name() {
        return this.commandName;
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
     */
    async run(message, args) { }

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

}
