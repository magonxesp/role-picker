import { BotClient } from "../bot";
import { ServerTextChannel } from "../models";
import EventHandler from "./EventHandler";
import { rolesNames } from "../helpers";
import { sprintf } from 'sprintf-js';

export default class MemberAddEventHandler extends EventHandler {

    /**
     * Get the default server text channel id
     *
     * @param {number|string} serverId
     *
     * @return {Promise<null|string>}
     */
    async #getDefaultTextChannelId(serverId) {
        const channel = await ServerTextChannel.findOne({
            where: {
                serverId: serverId
            }
        });

        if (channel !== null) {
            return channel.channelId.toString();
        }

        return null;
    }

    /**
     * Handle guild member add event
     *
     * @param {GuildMember} member
     */
    async handle(member) {
        let message = BotClient.getEventMessage('onGuildMemberAdd');
        const channelId = await this.#getDefaultTextChannelId(member.guild.id);

        if (channelId != null) {
            const roles = await member.guild.roles.cache.array();

            if (message) {
                const channel = member.guild.channels.cache.get(channelId);

                if (channel) {
                    await channel.send(sprintf(message, {
                        roles: rolesNames(roles).join(', ')
                    }));
                }
            }
        }
    }

}