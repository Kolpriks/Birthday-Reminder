export async function getUser() {
	const token = localStorage.getItem("token");

	if (!token) {
		throw new Error("Пользователь не авторизован");
	}

	const response = await fetch("http://localhost:8080/api/user-get", {
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
