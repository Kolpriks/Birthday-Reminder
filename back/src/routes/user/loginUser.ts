import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import postgres from 'postgres';

export const loginUser = (sql: postgres.Sql<any>) => {
	const router = Router();

	router.post('/', async (req: Request, res: Response) => {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ error: 'All fields are required' });
		}

		try {
			const user = await sql`
				SELECT * FROM users WHERE email = ${email}
			`;
			if (user.length === 0) {
				return res.status(404).json({ error: 'User not found' });
			}

			const isMatch = await bcrypt.compare(password, user[0].password);
			if (!isMatch) {
				return res.status(400).json({ error: 'Invalid credentials' });
			}

			const token = jwt.sign({ id: user[0].id, email: user[0].email }, process.env.JWT_SECRET as string, {
				expiresIn: '1d',
			});

			res.json({ token });
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: 'Database error' });
		}
	});

	return router;
};
