import { databaseClient } from '../helpers/database-client.js';
import { HttpResponse } from '../helpers/http-response.js';

export class CreateTaskController {
    async handle(req, res) {
        const httpResponse = new HttpResponse(res);

        try {
            const { title } = req.body;
            const { userId } = req;

            if (!title) {
                return httpResponse.badRequest(new Error('Nome da tarefa é obrigatório!'));
            }

            const userExists = await databaseClient.user.findUnique({ where: { id: userId } });
            if (!userExists) {
                return httpResponse.badRequest(new Error('Usuário não encontrado!'));
            }

            await databaseClient.task.create({
                data: {
                    title, userId: userExists.id
                }
            });

            return httpResponse.created({
                message: 'Tarefa criada com sucesso!'
            });
        } catch (error) {
            return httpResponse.serverError(error);
        }
    }
}
