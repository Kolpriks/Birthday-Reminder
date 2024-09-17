import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { getUser } from "../../api/userApi";

export default function Profile() {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			navigate("/login"); // Если нет токена, перенаправляем на страницу логина
		} else {
			getUser()
				.then((userData) => {
					setUser(userData); // Устанавливаем информацию о пользователе
				})
				.catch((error) => {
					console.error("Ошибка при получении данных пользователя:", error);
					navigate("/login"); // В случае ошибки также перенаправляем на логин
				});
		}
	}, [navigate]);

	// Функция для выхода из аккаунта
	const handleLogout = () => {
		localStorage.removeItem("token"); // Удаляем токен из localStorage
		navigate("/login"); // Перенаправляем на страницу логина
	};

	return (
		<div className="container">
			{user ? (
				<>
					<h1>Профиль</h1>
					<p>Имя пользователя: {user.name}</p>
					<p>Email: {user.email}</p>
					{/* Дополнительная информация о пользователе */}
					<button onClick={handleLogout} className="button">
						Выйти
					</button>
				</>
			) : (
				<p>Загрузка...</p> // Показываем, пока загружается информация
			)}
		</div>
	);
}
