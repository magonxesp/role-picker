import BotCommand from "./BotCommand";
import { ServerCommandsEnabled } from "../models";

export default class EnableCommand extends BotCommand {

    #messages = {};

    get description() {
        return "Activa los commandos para los miembros del servidor";
    }

    get name() {
        return "enable";
    }

    get permissions() {
        return ['ADMINISTRATOR'];
    }

    async enable(serverId) {
        try {
            const commandsEnabled = await ServerCommandsEnabled.findOne({
                where: {
                    serverId: serverId
                }
            });

            if (commandsEnabled === null) {
                await ServerCommandsEnabled.create({
                    serverId: serverId,
                    enabled: true
                });
            } else {
                commandsEnabled.enabled = true;
                await commandsEnabled.save();
            }

            return true;
        } catch (exception) {
            console.log(exception);
        }

        return false;
    }

    onLoad() {
        this.#messages = this.getResponseMessages('EnableCommand');
    }

    async run(message, args) {
        let enabled = await this.enable(message.guild.id);

        if (enabled) {
            await message.channel.send(this.#messages.success);
        } else {
            await message.channel.send(this.#messages.error);
        }
    }

}