import { Form, Link, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { registerUser } from "handlers";

export default function Register() {
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const name = formData.get("name") as string;
		const surname = formData.get("surname") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirmPassword") as string;

		try {
			await registerUser(name, surname, email, password, confirmPassword);
			navigate("/login");
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Произошла неизвестная ошибка");
			}
		}
	};

	return (
		<div className="container mx-auto max-w-md p-6 bg-white shadow-lg rounded-lg">
			<h1 className="text-2xl font-bold mb-4">Регистрация</h1>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			<Form method="post" onSubmit={handleSubmit} className="space-y-4">
				<label className="block">
					<span className="text-gray-700">Имя:</span>
					<input
						type="text"
						name="name"
						required
						className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
				</label>
				<label className="block">
					<span className="text-gray-700">Фамилия:</span>
					<input
						type="text"
						name="surname"
						required
						className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
				</label>
				<label className="block">
					<span className="text-gray-700">Email:</span>
					<input
						type="email"
						name="email"
						required
						className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
				</label>
				<label className="block">
					<span className="text-gray-700">Пароль:</span>
					<input
						type="password"
						name="password"
						required
						className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
				</label>
				<label className="block">
					<span className="text-gray-700">Подтвердите пароль:</span>
					<input
						type="password"
						name="confirmPassword"
						required
						className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
				</label>
				<button
					type="submit"
					className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
				>
					Зарегистрироваться
				</button>
			</Form>
			<p className="mt-4 text-center">
				Уже есть аккаунт?{" "}
				<Link to="/login" className="text-green-500 hover:underline">
					Авторизоваться
				</Link>
			</p>
		</div>
	);
}
