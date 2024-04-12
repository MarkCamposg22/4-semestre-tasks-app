import { databaseClient } from "../helpers/database-client.js";
import { HttpResponse } from "../helpers/http-response.js";

export class UpdateStatusTaskController {
    async handle(req, res) {
        const httpResponse = new HttpResponse(res);

        try {
            const { taskId } = req.params;
            const { finished } = req.body;
            const { userId } = req;

            const taskExists = await databaseClient.task.findUnique({ where: { id: taskId, userId } })
            if (!taskExists) {
                return httpResponse.badRequest(new Error('Tarefa não encontrada!'));
            }

            await databaseClient.task.update({
                where: { id: taskExists.id, userId },
                data: { finished }
            });

            return httpResponse.ok({
                message: 'Tarefa atualizada com sucesso!'
            });
        } catch (error) {
            return httpResponse.serverError(error);
        }
    }
}
