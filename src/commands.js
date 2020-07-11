import { BotCommand } from "./bot";

class HelloCommand extends BotCommand {

    constructor() {
        super();
        this.commandName = "hello";
    }

    async run(message) {
        await message.channel.send('hola');
    }

}

export const commands = [
    new HelloCommand(),
];