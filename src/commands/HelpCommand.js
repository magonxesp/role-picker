import { bot } from "../bot";
import BotCommand from './BotCommand';


export default class HelpCommand extends BotCommand {

    get name() {
        return "help";
    }

    get description() {
        return "Listado de comandos";
    }

    get usage() {
        return this.arguments([
            {
                name: 'comando',
                required: false
            }
        ]);
    }

    /**
     * Send command usage
     *
     * @param {string} commandName
     * @param {Message} message
     *
     * @return {Promise<void>}
     */
    async #commandHelp(commandName, message) {
        const command = bot.commands.filter((command) => command.fullName === commandName)[0];

        if (command != null) {
            let help = `\`\`\`${command.fullName} ${command.command.usage}\`\`\``;

            await message.channel.send(help);
        }
    }

    /**
     * Send command list
     *
     * @param {Message} message
     *
     * @return {Promise<void>}
     */
    async #commandList(message) {
        let help = ``;

        for (let command of bot.commands) {
            if (command.command.name !== this.name) {
                help += `**${command.fullName}** - ${command.command.description}\n`;
            }
        }

        await message.channel.send({
            embed: {
                color: 16777215,
                fields: [
                    {
                        name: "Lista de comandos",
                        value: help
                    }
                ]
            }
        });
    }

    async run(message, args) {
        if (args.length > 0) {
            await this.#commandHelp(args[0], message);
        } else {
            await this.#commandList(message);
        }
    }

}