import { Request, Response, Router } from 'express';
import postgres from 'postgres';

export const deleteBirthday = (sql: postgres.Sql<any>) => {
	const router = Router();

	router.delete('/:id', async (req: Request, res: Response) => {
		const { id } = req.params;

		try {
			const result = await sql`
        DELETE FROM birthdays
        WHERE id = ${id}
        RETURNING *
      `;
			if (result.length === 0) {
				return res.status(404).json({ error: 'Birthday not found' });
			}
			res.status(200).json({ message: 'Birthday deleted' });
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: 'Database error' });
		}
	});

	return router;
};
