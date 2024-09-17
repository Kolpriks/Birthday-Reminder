// front/api/birthdayApi.ts
export async function getUserBirthdays() {
	const token = localStorage.getItem("token");

	if (!token) {
		throw new Error("Пользователь не авторизован");
	}

	const response = await fetch("http://localhost:8080/api/birthdays", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`, // Передаем токен в заголовках
		},
	});

	if (!response.ok) {
		throw new Error("Не удалось получить дни рождения");
	}

	return await response.json();
}

export async function getBirthday(firstName: string, lastName: string, birthdate: string) {
	const response = await fetch(`http://localhost:8080/api/birthday/${firstName}-${lastName}-${birthdate}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});

	if (!response.ok) {
		throw new Error("Не удалось получить данные дня рождения");
	}

	return await response.json();
}

export async function addBirthday(firstName: string, lastName: string, birthdate: string) {
	const response = await fetch("http://localhost:8080/api/birthday", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({ firstName, lastName, birthdate }),
	});

	if (!response.ok) {
		throw new Error("Не удалось добавить день рождения");
	}

	return await response.json();
}

export async function updateBirthday(firstName: string, lastName: string, birthdate: string, id: number) {
	const response = await fetch(`http://localhost:8080/api/birthday/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({ firstName, lastName, birthdate }),
	});

	if (!response.ok) {
		throw new Error("Не удалось обновить день рождения");
	}

	return await response.json();
}

export async function deleteBirthday(id: number) {
	const response = await fetch(`http://localhost:8080/api/birthday/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});

	if (!response.ok) {
		throw new Error("Не удалось удалить день рождения");
	}

	return await response.json();
}


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
