
import { json } from '../modules/respond.js';

export const handler = {
    GET: (req) => {
        // Generate a UUID
        const uuid = crypto.randomUUID();

        // Return it as JSON
        return json(uuid);
    }
};
