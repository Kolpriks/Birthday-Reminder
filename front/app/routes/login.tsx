// front/app/routes/login.tsx
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
		<div className="container">
			<h1>Авторизация</h1>
			{error && <p className="error">{error}</p>}
			<Form method="post" onSubmit={handleSubmit}>
				<label>
					Email:
					<input type="email" name="email" required />
				</label>
				<label>
					Пароль:
					<input type="password" name="password" required />
				</label>
				<button type="submit">Войти</button>
			</Form>
			<p>
				Еще нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
			</p>
		</div>
	);
}
