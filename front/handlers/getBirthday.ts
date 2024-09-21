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
