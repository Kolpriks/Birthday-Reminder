import { Request, Response, Router } from 'express';
import postgres from 'postgres';

export const updateBirthday = (sql: postgres.Sql<any>) => {
	const router = Router();

	router.put('/:id', async (req: Request, res: Response) => {
		const { id } = req.params;
		const { firstName, lastName, birthdate } = req.body;

		if (!firstName || !lastName || !birthdate) {
			return res.status(400).json({ error: 'All fields are required' });
		}

		try {
			const result = await sql`
        UPDATE birthdays
        SET first_name = ${firstName}, last_name = ${lastName}, birthdate = ${birthdate}
        WHERE id = ${id}
        RETURNING *
      `;
			if (result.length === 0) {
				return res.status(404).json({ error: 'Birthday not found' });
			}
			res.status(200).json(result[0]);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: 'Database error' });
		}
	});

	return router;
};
