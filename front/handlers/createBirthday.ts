export async function createBirthday(firstName: string, lastName: string, birthdate: string) {
	const token = localStorage.getItem("token");

	if (!token) {
		throw new Error("Пользователь не авторизован");
	}

	const response = await fetch("http://localhost:8080/api/birthday", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`, // Передаем токен для авторизации
		},
		body: JSON.stringify({
			first_name: firstName,
			last_name: lastName,
			birthdate: birthdate,
		}),
	});

	if (!response.ok) {
		throw new Error("Ошибка при создании записи о дне рождения");
	}

	return await response.json();
}
