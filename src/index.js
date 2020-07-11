import "./settings";
import { BotClient } from "./bot";
import { squelize } from "./models";

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

