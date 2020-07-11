import { config } from "dotenv";
import path from "path";

export const root = path.resolve(path.join(__dirname, '..'));

export function loadSettings() {
    config({
        path: path.join(root, '.env')
    });
}
