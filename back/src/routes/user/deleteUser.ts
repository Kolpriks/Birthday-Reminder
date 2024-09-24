import { Router, Request, Response } from 'express';
import postgres from 'postgres';

export const deleteUser = (sql: postgres.Sql<any>) => {
	const router = Router();

	router.delete('/:id', async (req: Request, res: Response) => {
		const { id } = req.params;

		try {
			const result = await sql`
				DELETE FROM users WHERE id = ${id} RETURNING id
			`;

			if (result.length === 0) {
				return res.status(404).json({ error: 'User not found' });
			}

			res.status(200).json({ message: 'User deleted' });

		} catch (err) {
			console.error(err);
			res.status(500).json({ error: 'Database error' });
		}
	});

	return router;
};
