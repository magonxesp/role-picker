import "./settings";
import { botBootstrap } from "./bot";
import { squelize } from "./models";

(async () => {
    try {
        // connect to database
        await squelize.authenticate();
        // create tables if not exists
        await squelize.sync();
        // bot boostrap
        botBootstrap();
    } catch (error) {
        console.error("Error on bot start: " + error);
    }
})();

