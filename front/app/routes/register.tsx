import { Form, Link, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { registerUser } from "handlers";

export default function Register() {
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirmPassword") as string;

		try {
			await registerUser(email, password, confirmPassword);
			navigate("/login");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="container">
			<h1>Регистрация</h1>
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
				<label>
					Подтвердите пароль:
					<input type="password" name="confirmPassword" required />
				</label>
				<button type="submit">Зарегистрироваться</button>
			</Form>
			<p>
				Уже есть аккаунт? <Link to="/login">Авторизоваться</Link>
			</p>
		</div>
	);
}
