import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

export const registerUser = (sql: postgres.Sql<any>) => {
	const router = Router();

	router.post('/', async (req: Request, res: Response) => {
		const { name, surname, email, password } = req.body;

		if (!name || !surname || !email || !password) {
			return res.status(400).json({ error: 'All fields are required' });
		}

		try {
			const hashedPassword = await bcrypt.hash(password, 10);

			const result = await sql`
				INSERT INTO users (name, surname, email, password)
				VALUES (${name}, ${surname}, ${email}, ${hashedPassword})
				RETURNING id, email
			`;

			res.status(201).json(result[0]);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: 'Database error' });
		}
	});

	return router;
};
