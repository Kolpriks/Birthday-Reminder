import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { addBirthday } from './routes/birthdays/addBirthday';
import { getAllBirthdays } from './routes/birthdays/getAllBirthdays';
import { getBirthday } from './routes/birthdays/getBirthday';
import { updateBirthday } from './routes/birthdays/updateBirthday';
import { deleteBirthday } from './routes/birthdays/deleteBirthday';
import { registerUser } from './routes/user/registerUser';
import { deleteUser } from './routes/user/deleteUser';
import { loginUser } from './routes/user/loginUser';
import { getUser } from './routes/user/user';
import postgres from 'postgres';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const sql = postgres({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_DATABASE,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});

app.use('/api/add-birthday', addBirthday(sql));
app.use('/api/get-all-birthdays', getAllBirthdays(sql));
app.use('/api/update-birthday', updateBirthday(sql));
app.use('/api/delete-birthday', deleteBirthday(sql));
app.use('/api/birthday', getBirthday(sql));

app.use('/api/user-register', registerUser(sql));
app.use('/api/user-delete', deleteUser(sql));
app.use('/api/user-login', loginUser(sql));
app.use('/api/user-get', getUser(sql));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
