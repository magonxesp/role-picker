import { BotCommand, bot } from "../bot";
import {rolesNames} from "../helpers";


export default class HelpCommand extends BotCommand {

    get name() {
        return "help";
    }

    get description() {
        return "Listado de comandos";
    }

    async run(message, args) {
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

}