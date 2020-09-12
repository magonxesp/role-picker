import { BotCommand } from "../bot";


export default class HelpCommand extends BotCommand {

    get description() {
        return "help";
    }

    get name() {
        return "Listado de comandos";
    }

    async run(message, args) {
        return Promise.resolve(undefined);
    }

}