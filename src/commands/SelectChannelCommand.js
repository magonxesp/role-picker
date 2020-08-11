import { BotCommand } from "../bot";
import { ServerTextChannel } from "../models";


export default class SelectChannelCommand extends BotCommand {

    #messages = {};

    constructor() {
        super();
        this.commandName = 'select';
    }

    onLoad() {
        this.#messages = this.getResponseMessages('SelectChannelCommand');
    }

    async saveChannel(channelId, serverId) {
        const channel = await ServerTextChannel.findOne({
            where: {
                channelId: channelId,
                serverId: serverId
            }
        });

        if (channel === null) {
            await ServerTextChannel.create({
                channelId: channelId,
                serverId: serverId
            });

            return true;
        }

        return false;
    }

    async run(message, args) {
        try {
            const saved = await this.saveChannel(message.channel.id, message.guild.id);

            if (saved) {
                await message.channel.send(this.#messages.success);
            } else {
                await message.channel.send(this.#messages.in_use);
            }
        } catch (exception) {
            await message.channel.send(this.#messages.error);
            console.log(exception);
        }
    }

}