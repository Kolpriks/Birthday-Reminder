import { Router, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import postgres from 'postgres';

export const getUser = (sql: postgres.Sql<any>) => {
	const router = Router();

	router.get('/', async (req: Request, res: Response) => {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({ error: 'Токен не предоставлен' });
		}

		const token = authHeader.split(' ')[1];

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as JwtPayload & { id: number };

			if (!decoded || !decoded.id) {
				return res.status(401).json({ error: 'Неверный токен' });
			}

			const result = await sql`
				SELECT id, email, name, surname FROM users WHERE id = ${decoded.id}
			`;

			if (result.length === 0) {
				return res.status(404).json({ error: 'Пользователь не найден' });
			}

			res.json(result[0]);
		} catch (err) {
			console.error(err);
			return res.status(401).json({ error: 'Неверный или просроченный токен' });
		}
	});

	return router;
};
