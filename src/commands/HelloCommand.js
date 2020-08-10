import { BotCommand } from "../bot";


export default class HelloCommand extends BotCommand {

    constructor() {
        super();
        this.commandName = 'hello';
    }

    async run(message, args) {
        await message.channel.send('hola');
    }

}