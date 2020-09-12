import { BotCommand } from "../bot";


export default class HelloCommand extends BotCommand {

    get name() {
        return "hello";
    }

    get description() {
        return "Say hello";
    }

    async run(message, args) {
        await message.channel.send('hola');
    }

}