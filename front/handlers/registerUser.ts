export async function registerUser(email: string, password: string, confirmPassword: string) {
	if (password !== confirmPassword) {
		throw new Error("Пароли не совпадают");
	}

	const response = await fetch("http://localhost:8080/api/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		throw new Error("Ошибка при регистрации");
	}

	return await response.json();
}
