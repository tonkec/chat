import { setupServer } from 'msw/node';
import { handlersForUserPage } from './handlers';
export const server = setupServer(...handlersForUserPage);
