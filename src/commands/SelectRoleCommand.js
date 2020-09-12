import { BotCommand } from "../bot";
import { sprintf } from "sprintf-js";
import { parseRoleArgument } from "../helpers";

export default class SelectRoleCommand extends BotCommand {

    #messages = {};

    get description() {
        return "Te une a un rol";
    }

    get name() {
        return "join";
    }

    onLoad() {
        this.#messages = this.getResponseMessages('SelectRoleCommand');
    }

    async run(message, args) {
        const role = parseRoleArgument(args[0], message);

        try {
            const member = message.member;

            if (role != null) {
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