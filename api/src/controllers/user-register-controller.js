import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { HttpResponse } from '../helpers/http-response.js';
import { databaseClient } from '../helpers/database-client.js'
import { env } from '../config/env.js';

export class UserRegisterController {
    async handle(req, res) {
        const httpResponse = new HttpResponse(res);

        try {
            const { email, password, passwordConfirmation } = req.body;

            if (!email || !password || !passwordConfirmation) {
                return httpResponse.badRequest(new Error('Dados inválidos!'))
            }

            const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regexEmail.test(email)) {
                return httpResponse.badRequest(new Error('E-mail inválido!'));
            }

            const userAlreadyExists = await databaseClient.user.findUnique({ where: { email } });
            if (userAlreadyExists) {
                return httpResponse.badRequest(new Error('Usuário já cadastrado!'))
            }

            if (password !== passwordConfirmation) {
                return httpResponse.badRequest(new Error('As senhas devem ser iguais.'));
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await databaseClient.user.create({
                data: {
                    email, password: hashedPassword
                }
            });

            const accessToken = jwt.sign({ userId: user.id }, env.secretKey, { expiresIn: '7d' });

            return httpResponse.created({ accessToken });
        } catch (error) {
            return httpResponse.serverError(error);
        }
    }
}
