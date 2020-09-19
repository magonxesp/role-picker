import BotCommand from "./BotCommand";
import { RolesExcluded } from "../models";
import { parseRoleArgument, rolesExcluded } from "../helpers";
import { sprintf } from "sprintf-js";


export default class ExcludeRoleCommand extends BotCommand {

    #messages = {};

    get description() {
        return "Marca un rol como no asignable";
    }

    get name() {
        return "exclude";
    }

    get usage() {
        return this.arguments([
            {
                name: 'rol',
                required: true
            }
        ]);
    }

    get permissions() {
        return ['ADMINISTRATOR'];
    }

    onLoad() {
        this.#messages = this.getResponseMessages('ExcludeRoleCommand');
    }

    async run(message, args) {
        const role = parseRoleArgument(args[0], message);
        const excluded = await rolesExcluded(message.guild.id);

        if (role != null && !excluded.includes(role.id)) {
            try {
                await RolesExcluded.create({
                    serverId: message.guild.id,
                    roleId: role.id
                });

                await message.channel.send(sprintf(this.#messages['success'], {
                    role: role
                }));
            } catch (exception) {
                await message.channel.send(this.#messages['error']);
                console.log(exception);
            }
        }
    }

}