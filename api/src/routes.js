import { Router } from 'express';

import { UserRegisterController } from './controllers/user-register-controller.js'
import { UserLoginController } from './controllers/user-login-controller.js';
import { CreateTaskController } from './controllers/create-task-controller.js';
import { UpdateStatusTaskController } from './controllers/update-status-task-controller.js';
import { RemoveTaskController } from './controllers/remote-task-controller.js';
import { ListTasksController } from './controllers/list-tasks-controller.js';

import { authMiddleware } from './middlewares/auth-middleware.js';

const routes = Router();

routes.post('/api/register', new UserRegisterController().handle);
routes.post('/api/login', new UserLoginController().handle);

routes.post('/api/task', authMiddleware, new CreateTaskController().handle);
routes.patch('/api/task/:taskId', authMiddleware, new UpdateStatusTaskController().handle);
routes.delete('/api/task/:taskId', authMiddleware, new RemoveTaskController().handle);
routes.get('/api/task', authMiddleware, new ListTasksController().handle);

export { routes };
