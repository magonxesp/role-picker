import { BotCommand } from '../bot';
import { rolesNames } from "../helpers";
import { sprintf } from 'sprintf-js';

export default class RoleListCommand extends BotCommand {

    #messages = {};

    get name() {
        return 'roles';
    }

    get description() {
        return "Lista de roles disponibles";
    }

    onLoad() {
        this.#messages = this.getResponseMessages('RoleListCommand');
    }

    async run(message, args) {
        let roles = message.guild.roles.cache.array();

        await message.channel.send(sprintf(this.#messages['success'], { roles: roles }));
    }

}