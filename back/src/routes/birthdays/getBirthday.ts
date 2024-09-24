import { Router, Request, Response } from 'express';
import postgres from 'postgres';

export const getBirthday = (sql: postgres.Sql<any>) => {
    const router = Router();

    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const result = await sql`
				SELECT * FROM birthdays WHERE id = ${id}
			`;

            if (result.length === 0) {
                return res.status(404).json({ error: 'Запись не найдена' });
            }

            res.status(200).json(result[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка базы данных' });
        }
    });

    return router;
};
