import { BotCommand } from "../bot";
import { sprintf } from "sprintf-js";
import { parseRoleArgument } from "../helpers";

export default class RemoveRoleCommand extends BotCommand {

    #messages = {};

    get description() {
        return "Te quita un rol asignado";
    }

    get name() {
        return "leave";
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
        this.#messages = this.getResponseMessages('RemoveRoleCommand');
    }

    async run(message, args) {
        const role = parseRoleArgument(args[0], message);

        try {
            const member = message.member;

            if (role != null) {
                const memberRole = member.roles.cache.filter((_role) => _role.id === role.id);

                if (memberRole.size > 0) {
                    await member.roles.remove(memberRole);

                    await message.channel.send(sprintf(this.#messages['success'], {
                        role: role,
                        user: message.member
                    }));
                }
            }
        } catch (exception) {
            console.log(exception);
        }
    }

}