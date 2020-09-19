import BotCommand from "./BotCommand";
import { ServerTextChannel } from "../models";


export default class RemoveChannelCommand extends BotCommand {

    #messages = {};

    get name() {
        return "off";
    }

    get description() {
        return "Desactiva el evento de enseñar los roles disponibles a un miembro nuevo en este canal";
    }

    onLoad() {
        this.#messages = this.getResponseMessages('RemoveChannelCommand');
    }

    async removeChannel(channelId, serverId) {
        const channel = await ServerTextChannel.findOne({
            where: {
                channelId: channelId,
                serverId: serverId
            }
        });

        if (channel != null) {
            await channel.destroy();

            return true;
        }

        return false;
    }

    async run(message, args) {
        try {
            if (message.member.hasPermission("ADMINISTRATOR")) {
                const removed = await this.removeChannel(message.channel.id, message.guild.id);

                if (removed) {
                    await message.channel.send(this.#messages.success);
                }
            }
        } catch (exception) {
            await message.channel.send(this.#messages.error);
            console.log(exception);
        }
    }

}