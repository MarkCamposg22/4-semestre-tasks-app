import jwt from 'jsonwebtoken';

import { HttpResponse } from "../helpers/http-response.js";
import { env } from '../config/env.js';

export async function authMiddleware(req, res, next) {
    const httpResponse = new HttpResponse(res);

    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return httpResponse.unauthorized();
        }

        const payload = jwt.verify(token, env.secretKey);

        req.userId = payload.userId;

        next();
    } catch (error) {
        return httpResponse.serverError(new Error('Token inválido!'));
    }
}
