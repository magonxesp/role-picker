import { BotCommand } from "../bot";
import { RolesExcluded } from "../models";
import { parseRoleArgument, rolesExcluded } from "../helpers";
import { sprintf } from "sprintf-js";


export default class IncludeRoleCommand extends BotCommand {

    #messages = {};

    get description() {
        return "Marca un rol excluido como asignable";
    }

    get name() {
        return "include";
    }

    onLoad() {
        this.#messages = this.getResponseMessages('IncludeRoleCommand');
    }

    async run(message, args) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            const role = parseRoleArgument(args[0], message);
            const excluded = await rolesExcluded(message.guild.id);

            if (role != null && excluded.includes(role.id)) {
                try {
                    const roleExcluded = await RolesExcluded.findOne({
                        where: {
                            serverId: message.guild.id,
                            roleId: role.id
                        }
                    });

                    if (roleExcluded != null) {
                        await roleExcluded.destroy();

                        await message.channel.send(sprintf(this.#messages['success'], {
                            role: role
                        }));
                    }
                } catch (exception) {
                    await message.channel.send(this.#messages['error']);
                    console.log(exception);
                }
            }
        }
    }

}