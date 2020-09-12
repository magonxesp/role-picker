import { RolesExcluded } from "./models";

/**
 * Returns a clean list of role names
 *
 * @param {Role[]} roles The roles array
 * @param {boolean} embed
 *
 * @return {string[]}
 */
export function rolesNames(roles, embed = false) {
    let names = [];

    for (let role of roles) {
        if (!role.deleted && role.name.charAt(0) !== '@') {
            if (embed) {
                names.push(`<@${role.id}>`);
            } else {
                names.push(role.name);
            }
        }
    }

    return names;
}

/**
 * Return if role is valid for select
 *
 * @param {Role} role
 *
 * @return boolean
 */
export function roleFilter(role) {
    return !role.deleted && role.name.charAt(0) !== '@';
}

/**
 * Return roles array filtered without excluded roles
 *
 * @param {Role[]} roles
 * @param {string|null} guildId
 *
 * @returns {Role[]}
 */
export async function asyncRoleFilter(roles, guildId = null) {
    let excluded = [];

    if (guildId != null) {
        excluded = await rolesExcluded(guildId);
    }

    return roles.filter((role) => roleFilter(role) && !excluded.includes(role.id));
}

/**
 * Parse role from command argument
 *
 * @param {string} roleNameArgument
 * @param {Message} message
 *
 * @return {Role}
 */
export function parseRoleArgument(roleNameArgument, message) {
    let matches = null;
    let role;

    if ((matches = /^<@&(\d+)>$/.exec(roleNameArgument)) != null) {
        role = message.guild.roles.cache.find(role => role.id === matches[1]);
    } else {
        role = message.guild.roles.cache.find(role => role.name === roleNameArgument);
    }

    return role;
}

/**
 * Get guild roles excluded ids
 *
 * @param {string} guildId
 *
 * @return {Promise<string[]>}
 */
export async function rolesExcluded(guildId) {
    let rolesExcluded = [];

    try {
        const excluded = await RolesExcluded.findAll({
            where: {
                serverId: guildId
            }
        });

        for (let roleExcluded of excluded) {
            rolesExcluded.push(roleExcluded.roleId);
        }
    } catch (exception) {
        console.log(exception);
    }

    return rolesExcluded;
}