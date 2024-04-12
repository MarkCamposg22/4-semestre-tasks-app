import { databaseClient } from "../helpers/database-client.js";
import { HttpResponse } from "../helpers/http-response.js";

export class RemoveTaskController {
    async handle(req, res) {
        const httpResponse = new HttpResponse(res);

        try {
            const { taskId } = req.params;
            const { userId } = req;

            const taskExists = await databaseClient.task.findUnique({ where: { id: taskId, userId } });
            if (!taskExists) {
                return httpResponse.badRequest(new Error('Tarefa não encontrada!'));
            }

            await databaseClient.task.delete({ where: { id: taskId, userId } });

            return httpResponse.ok({
                message: 'Tarefa removida com sucesso!'
            });
        } catch (error) {
            return httpResponse.serverError(error);
        }
    }
}
