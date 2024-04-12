import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { HttpResponse } from '../helpers/http-response.js';
import { databaseClient } from '../helpers/database-client.js'
import { env } from '../config/env.js';

export class UserLoginController {
    async handle(req, res) {
        const httpResponse = new HttpResponse(res);

        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return httpResponse.badRequest(new Error('Dados inválidos!'));
            }

            const user = await databaseClient.user.findUnique({ where: { email } });
            if (!user) {
                return httpResponse.badRequest(new Error('Nenhum usuário foi encontrado!'));
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return httpResponse.badRequest(new Error('Credenciais inválidas!'));
            }

            const accessToken = jwt.sign({ userId: user.id }, env.secretKey, { expiresIn: '7d' });

            return httpResponse.ok({ accessToken });
        } catch (error) {
            return httpResponse.serverError(error);
        }
    }
}
