import BotCommand from "./BotCommand";
import { sprintf } from "sprintf-js";
import {parseRoleArgument, rolesExcluded} from "../helpers";

export default class SelectRoleCommand extends BotCommand {

    #messages = {};

    get description() {
        return "Te une a un rol";
    }

    get name() {
        return "join";
    }

    get usage() {
        return this.arguments([
            {
                name: 'rol',
                required: true
            }
        ]);
    }

    onLoad() {
        this.#messages = this.getResponseMessages('SelectRoleCommand');
    }

    async run(message, args) {
        const role = parseRoleArgument(args[0], message);

        try {
            const member = message.member;
            const excluded = await rolesExcluded(message.guild.id);

            if (role != null && !excluded.includes(role.id)) {
                await member.roles.add(role);

                await message.channel.send(sprintf(this.#messages['success'], {
                    role: role,
                    user: message.member
                }));
            }
        } catch (exception) {
            console.log(exception);
        }
    }

}