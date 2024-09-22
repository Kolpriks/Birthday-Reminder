import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { getUser } from "handlers";

interface User {
	email: string,
	password: string,
	name: string,
	surname: string,
	id: number,
}

export default function Profile() {
	const [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			navigate("/login");
		} else {
			getUser()
				.then((userData) => {
					setUser(userData);
				})
				.catch((error) => {
					console.error("Ошибка при получении данных пользователя:", error);
					navigate("/login");
				});
		}
	}, [navigate]);


	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<div className="container">
			{user ? (
				<>
					<h1>Профиль</h1>
					<p>Имя пользователя: {user.name}</p>
					<p>Email: {user.email}</p>

					<button onClick={handleLogout} className="button">
						Выйти
					</button>
				</>
			) : (
				<p>Загрузка...</p>
			)}
		</div>
	);
}
