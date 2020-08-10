import { BotCommand } from "../bot";
import { ServerTextChannel } from "../models";


export default class SelectChannelCommand extends BotCommand {

    #messages = {};

    constructor() {
        super();
        this.commandName = 'select';
        this.#messages = this.getResponseMessages('SelectChannelCommand');
    }

    async run(message, args) {
        try {
            await ServerTextChannel.create({
                channelId: message.channel.id,
                serverId: message.guild.id
            });

            await message.channel.send(this.#messages['success']);
        } catch (exception) {
            await message.channel.send(this.#messages['error']);
            console.log(exception);
        }
    }

}