import BotCommand from "./BotCommand";
import { ServerTextChannel } from "../models";


export default class SelectChannelCommand extends BotCommand {

    #messages = {};

    get name() {
        return "listen";
    }

    get description() {
        return "Enseña la lista de roles disponibles a un miembro nuevo en este canal";
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
            if (message.member.hasPermission("ADMINISTRATOR")) {
                const saved = await this.saveChannel(message.channel.id, message.guild.id);

                if (saved) {
                    await message.channel.send(this.#messages.success);
                } else {
                    await message.channel.send(this.#messages.in_use);
                }
            }
        } catch (exception) {
            await message.channel.send(this.#messages.error);
            console.log(exception);
        }
    }

}