import { Form, Link, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { loginUser } from "handlers";

export default function Login() {
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		try {
			const response = await loginUser(email, password);
			localStorage.setItem("token", response.token);
			navigate("/");
		} catch (err) {
			setError("Ошибка авторизации");
		}
	};

	return (
		<div className="container mx-auto max-w-md p-6 bg-white shadow-lg rounded-lg">
			<h1 className="text-2xl font-bold mb-4">Авторизация</h1>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			<Form method="post" onSubmit={handleSubmit} className="space-y-4">
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
				<button
					type="submit"
					className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
				>
					Войти
				</button>
			</Form>
			<p className="mt-4 text-center">
				Еще нет аккаунта?{" "}
				<Link to="/register" className="text-green-500 hover:underline">
					Зарегистрироваться
				</Link>
			</p>
		</div>
	);
}
