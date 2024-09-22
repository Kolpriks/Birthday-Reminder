import { Router, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import postgres from 'postgres';

// Функция для создания маршрута
export const getUser = (sql: postgres.Sql<any>) => {
	const router = Router();

	router.get('/', async (req: Request, res: Response) => {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({ error: 'Токен не предоставлен' });
		}

		const token = authHeader.split(' ')[1]; // Извлекаем токен из заголовка

		try {
			// Декодируем токен, приведя результат к unknown и затем выполняем безопасное приведение к типу
			const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as JwtPayload & { id: number };

			// Проверяем, что у объекта действительно есть поле id
			if (!decoded || !decoded.id) {
				return res.status(401).json({ error: 'Неверный токен' });
			}

			// Ищем пользователя в базе данных по ID
			const result = await sql`
        SELECT id, email FROM users WHERE id = ${decoded.id}
      `;

			if (result.length === 0) {
				return res.status(404).json({ error: 'Пользователь не найден' });
			}

			// Возвращаем информацию о пользователе
			res.json(result[0]);
		} catch (err) {
			console.error(err);
			return res.status(401).json({ error: 'Неверный или просроченный токен' });
		}
	});

	return router;
};
