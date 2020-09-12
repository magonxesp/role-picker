import "./settings";
import { squelize } from "./models";
import getEvents from "./event/events";
import botCommands from "./commands/commands";
import { bot, BotClient } from "./bot";

(async () => {
    try {
        // connect to database
        await squelize.authenticate();
        // create tables if not exists
        await squelize.sync();
        // load bot configuration
        BotClient.loadConfig();
        // setup event listeners
        bot.setupEventListeners(getEvents());
        // set bot commands
        bot.setCommands(botCommands());
        // bot login
        bot.login(process.env.TOKEN);
    } catch (error) {
        console.error("Error on bot start: " + error);
        process.exit(1);
    }
})();

