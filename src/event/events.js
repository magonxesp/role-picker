import MemberAddEventHandler from "./MemberAddEventHandler";

const events = [
    {
        event: "guildMemberAdd",
        handler: new MemberAddEventHandler()
    }
];

/**
 * Get defined Event handlers
 *
 * @return {Array<{event: any, handler: EventHandler}>}
 */
export default function getEvents() {
    return events;
}