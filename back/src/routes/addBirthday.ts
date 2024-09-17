import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import postgres from 'postgres';

export const addBirthday = (sql: postgres.Sql<any>) => {
	const router = Router();

	router.post('/', async (req: Request, res: Response) => {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({ error: 'Токен не предоставлен' });
		}

		const token = authHeader.split(' ')[1];

		try {
			// Верифицируем JWT-токен и получаем user_id
			const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
			const userId = decoded.id;

			const { first_name, last_name, birthdate } = req.body;

			if (!first_name || !last_name || !birthdate) {
				return res.status(400).json({ error: 'Все поля обязательны' });
			}

			// Вставляем запись с user_id
			const result = await sql`
        INSERT INTO birthdays (user_id, first_name, last_name, birthdate)
        VALUES (${userId}, ${first_name}, ${last_name}, ${birthdate})
        RETURNING *
      `;

			res.status(201).json(result[0]);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: 'Ошибка базы данных' });
		}
	});

	return router;
};
