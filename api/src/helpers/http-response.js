export class HttpResponse {
    constructor(response) {
        this.response = response;
    }

    ok(body) {
        return this.response.status(200).json(body);
    }

    created(body) {
        return this.response.status(201).json(body)
    }

    badRequest(error) {
        return this.response.status(400).json({
            error: error.message
        });
    }

    unauthorized() {
        return this.response.status(401).json({
            error: 'Não autorizado!'
        });
    }

    serverError(error) {
        return this.response.status(500).json({
            error: error.message
        });
    }
}
