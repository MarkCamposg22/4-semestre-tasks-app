import { databaseClient } from "../helpers/database-client.js";
import { HttpResponse } from "../helpers/http-response.js";

export class ListTasksController {
    async handle(req, res) {
        const httpResponse = new HttpResponse(res);

        try {
            const { userId } = req;

            const tasks = await databaseClient.task.findMany({ where: { userId }, orderBy: { title: 'asc' } });

            return httpResponse.ok(tasks.map(item => {
                return {
                    id: item.id,
                    title: item.title,
                    finished: item.finished,
                }
            }));
        } catch (error) {
            return httpResponse.serverError(error);
        }
    }
}
