import BotCommand from "./BotCommand";
import { ServerCommandsEnabled } from "../models";

export default class DisableCommand extends BotCommand {

    #messages = {};

    get description() {
        return "Desactiva los commandos para los miembros del servidor";
    }

    get name() {
        return "disable";
    }

    get permissions() {
        return ['ADMINISTRATOR'];
    }

    async disable(serverId) {
        try {
            const commandsEnabled = await ServerCommandsEnabled.findOne({
                where: {
                    serverId: serverId
                }
            });

            if (commandsEnabled === null) {
                await ServerCommandsEnabled.create({
                    serverId: serverId,
                    enabled: false
                });
            } else {
                commandsEnabled.enabled = false;
                await commandsEnabled.save();
            }

            return true;
        } catch (exception) {
            console.log(exception);
        }

        return false;
    }

    onLoad() {
        this.#messages = this.getResponseMessages('DisableCommand');
    }

    async run(message, args) {
        let disabled = await this.disable(message.guild.id);

        if (disabled) {
            await message.channel.send(this.#messages.success);
        } else {
            await message.channel.send(this.#messages.error);
        }
    }

}