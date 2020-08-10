import "./settings";
import { BotClient } from "./bot";
import { commands } from "./commands/commands";
import { squelize } from "./models";

(async () => {
    try {
        // connect to database
        await squelize.authenticate();
        // load bot configuration
        BotClient.loadConfig();
        // create bot instance
        const bot = new BotClient();
        // set bot commands
        bot.setCommands(commands);
        // bot login
        bot.login(process.env.TOKEN);
    } catch (error) {
        console.error("Error on bot start: " + error);
    }
})();

