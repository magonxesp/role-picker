import { Client } from "discord.js";
import { root } from "./settings";
import fs from "fs";
import path from "path";

/**
 * BotClient Class
 */
export class BotClient extends Client {

    /**
     * Bot configuration object
     *
     * @type {object}
     * @private
     */
    #config = {};

    /**
     * BotClient constructor
     */
    constructor() {
        super();
        this.on('guildMemberAdd', this.#onGuildMemberAdd);
        this.on('message', this.#onMessage);
        this.#loadConfig();
    }

    /**
     * Load bot configuration
     *
     * @private
     */
    #loadConfig() {
        const configPath = path.join(root, 'config', 'config.json');

        if (this.#config == null) {
            if (fs.existsSync(configPath)) {
                this.#config = require(configPath);
            } else {
                throw "config/config.json not exists!";
            }
        }
    }

    /**
     * Get Event Message
     *
     * @param {string} event
     * @return {string}
     */
    getEventMessage(event) {
        if (typeof this.#config['messages'][event] !== 'undefined') {
            return this.#config['messages'][event];
        }

        return '';
    }

    /**
     * Guild member add event
     *
     * @param {GuildMember} member
     * @private
     */
    async #onGuildMemberAdd(member) {
        let message = this.getEventMessage('onGuildMemberAdd');
        const roles = await member.guild.roles.cache;

        if (message) {
            message += `: ${roles.array().join(', ')}`;
        }
    }

    /**
     * On message event
     *
     * @param {Message} message
     * @private
     */
    async #onMessage(message) {
        if (message.content.includes(this.#config.command_prefix, 0)) {
            await message.channel.send('hola');
        }
    }

}
