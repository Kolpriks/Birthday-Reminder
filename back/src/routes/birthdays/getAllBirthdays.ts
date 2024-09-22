import { Request, Response, Router } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import postgres from 'postgres';

export const getAllBirthdays = (sql: postgres.Sql<any>) => {
	const router = Router();

	router.get('/', async (req: Request, res: Response) => {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({ error: 'Токен не предоставлен' });
		}

		const token = authHeader.split(' ')[1]; // Извлекаем токен

		try {
			// Декодируем токен
			const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload & { id: number };

			// Проверяем наличие идентификатора пользователя в токене
			if (!decoded || !decoded.id) {
				return res.status(401).json({ error: 'Неверный токен' });
			}

			// Выполняем запрос на получение дней рождений для конкретного пользователя
			const result = await sql`
				SELECT * FROM birthdays WHERE user_id = ${decoded.id} ORDER BY birthdate
			`;

			// Отправляем результат клиенту
			res.status(200).json(result);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: 'Database error' });
		}
	});

	return router;
};
