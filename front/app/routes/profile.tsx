import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { getUser } from "handlers";

interface User {
	email: string;
	password: string;
	name: string;
	surname: string;
	id: number;
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
		<div className="container mx-auto p-10">
			{user ? (
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h1 className="text-3xl text-black font-bold mb-4">Профиль</h1>
					<p className="text-lg mb-2 text-black">Имя пользователя: <span className="font-semibold">{user.name}</span></p>
					<p className="text-lg mb-2 text-black">Фамилия пользователя: <span className="font-semibold">{user.surname}</span></p>
					<p className="text-lg mb-4 text-black">Email: <span className="font-semibold">{user.email}</span></p>

					<button
						onClick={handleLogout}
						className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
					>
						Выйти
					</button>
				</div>
			) : (
				<p className="text-center text-gray-500">Загрузка...</p>
			)}
		</div>
	);
}
