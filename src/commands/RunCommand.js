import { ServerCommandsEnabled } from "../models";

/**
 * RunCommand class
 */
export default class RunCommand {

    /**
     * RunCommand constuctor
     *
     * @param {BotCommand} command
     */
    constructor(command) {
        this.command = command;
    }

    /**
     * Check if member can execute the command
     *
     * @param {GuildMember} member
     */
    #hasPermission(member) {
        for (let permission of this.command.permissions) {
            if (!member.hasPermission(permission)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Retuns if commands is enabled for guild members
     *
     * @param {string} guildId
     * @param {GuildMember} member
     * @return {Promise<boolean>}
     */
    async #isEnabled(guildId, member) {
        if (member.hasPermission("ADMINISTRATOR") || this.command.alwaysEnabled) {
            return true;
        }

        const commandsEnabled = await ServerCommandsEnabled.findOne({
            where: {
                serverId: guildId
            }
        });

        if (commandsEnabled) {
            return commandsEnabled.enabled;
        }

        return false;
    }

    /**
     * Execute the command
     *
     * @param {Message} message
     * @param {Array<string>} args
     */
    async execute(message, args) {
        if (!(await this.#isEnabled(message.guild.id, message.member))) {
            await message.channel.send('Este comando esta desactivado');
            return;
        }

        if (!this.#hasPermission(message.member)) {
            await message.channel.send('No tienes permiso para ejecutar este comando');
            return;
        }

        await this.command.run(message, args);
    }

}