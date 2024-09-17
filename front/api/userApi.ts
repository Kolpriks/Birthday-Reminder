// front/api/userApi.ts

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

export async function loginUser(email: string, password: string) {
	const response = await fetch("http://localhost:8080/api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		throw new Error("Ошибка при авторизации");
	}

	return await response.json(); // Вернется JWT токен
}

// front/api/userApi.ts
export async function getUser() {
	const token = localStorage.getItem("token");

	if (!token) {
		throw new Error("Пользователь не авторизован");
	}

	const response = await fetch("http://localhost:8080/api/user", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Не удалось получить данные пользователя");
	}

	return await response.json();
}


export async function deleteUser(userId: number) {
	const response = await fetch(`http://localhost:8080/api/deleteUser/${userId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Ошибка при удалении пользователя");
	}

	return await response.json();
}
