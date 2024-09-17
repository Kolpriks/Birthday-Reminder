import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { addBirthday } from './routes/addBirthday';
import { getAllBirthdays } from './routes/getAllBirthdays';
import { updateBirthday } from './routes/updateBirthday';
import { deleteBirthday } from './routes/deleteBirthday';
import { registerUser } from './routes/registerUser';
import { deleteUser } from './routes/deleteUser';
import { loginUser } from './routes/loginUser';
import { getUser } from './routes/user';
import postgres from 'postgres';

dotenv.config();

// Инициализация приложения
const app = express();
app.use(cors());
app.use(express.json()); // Вместо bodyParser можно использовать встроенный парсер

// Настройка подключения к базе данных
const sql = postgres({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_DATABASE,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});

// Привязываем маршруты
app.use('/api/birthday', addBirthday(sql));
app.use('/api/birthdays', getAllBirthdays(sql));
app.use('/api/birthday', updateBirthday(sql));
app.use('/api/birthday', deleteBirthday(sql));

// Маршруты для пользователей
app.use('/api/register', registerUser(sql));
app.use('/api/deleteUser', deleteUser(sql));
app.use('/api/login', loginUser(sql));
app.use('/api/user', getUser(sql));


// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
