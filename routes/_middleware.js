
import { session }        from '../modules/session.js';
import { authentication } from '../modules/authentication.js';

export const handler = [session, authentication];
