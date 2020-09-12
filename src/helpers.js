/**
 * Returns a clean list of role names
 *
 * @param {Role[]} roles The roles array
 *
 * @return {string[]}
 */
export function rolesNames(roles) {
    let names = [];

    for (let role of roles) {
        if (!role.deleted && role.name.charAt(0) !== '@') {
            names.push(role.name);
        }
    }

    return names;
}