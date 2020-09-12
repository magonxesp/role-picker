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
    return role.name.charAt(0) !== '@';
}