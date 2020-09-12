import { BotCommand } from "../bot";


export default class SelectRoleCommand extends BotCommand {

    get description() {
        return "Selecciona un rol";
    }

    get name() {
        return "select";
    }

    async run(message, args) {
        return Promise.resolve(undefined);
    }
}