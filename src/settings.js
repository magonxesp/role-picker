import { config } from "dotenv";
import path from "path";

/**
 * App root directory absolute path
 *
 * @type {string}
 */
export const root = path.resolve(path.join(__dirname, '..'));

/**
 * Load settings
 *
 * @param {Function} callback
 *      Callback after load .env variables
 */
export function loadSettings(callback = () => {}) {
    config({
        path: path.join(root, '.env')
    });

    callback();
}

// Load .env
loadSettings();