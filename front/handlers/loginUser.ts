export async function loginUser(email: string, password: string) {
	const response = await fetch("http://localhost:8080/api/user-login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		throw new Error("Ошибка при авторизации");
	}

	return await response.json();
}
