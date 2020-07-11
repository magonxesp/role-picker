import { BotClient } from "./bot";
import { loadSettings } from "./settings";
import { squelize } from "./models";

loadSettings();

(async () => {
    try {
        // connect to database
        await squelize.authenticate();

        // create bot instance
        const bot = new BotClient();

        // bot login
        bot.login(process.env.TOKEN);
    } catch (error) {
        console.error("Error on bot start: " + error);
    }
})();

