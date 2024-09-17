import { Request, Response, Router } from 'express';
import postgres from 'postgres';

export const getAllBirthdays = (sql: postgres.Sql<any>) => {
	const router = Router();

	router.get('/', async (req: Request, res: Response) => {
		try {
			const result = await sql`SELECT * FROM birthdays ORDER BY birthdate`;
			res.status(200).json(result);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: 'Database error' });
		}
	});

	return router;
};
