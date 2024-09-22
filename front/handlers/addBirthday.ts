export async function addBirthday(firstName: string, lastName: string, birthdate: string) {
	const response = await fetch("http://localhost:8080/api/add-birthday", {
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
