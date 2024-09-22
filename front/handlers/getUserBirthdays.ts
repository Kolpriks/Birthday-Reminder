export async function getUserBirthdays() {
	const token = localStorage.getItem("token");

	if (!token) {
		throw new Error("Пользователь не авторизован");
	}

	const response = await fetch("http://localhost:8080/api/get-all-birthdays", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Не удалось получить дни рождения");
	}

	return await response.json();
}
