/**
 * Event handler interface
 *
 * @interface
 */
export default class EventHandler {

    /**
     * Handle The event
     *
     * @param {any} args
     * @abstract
     * @return {void}
     */
    handle(...args) { }

}