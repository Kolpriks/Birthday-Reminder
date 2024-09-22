export async function updateBirthday(firstName: string, lastName: string, birthdate: string, id: number) {
	const response = await fetch(`http://localhost:8080/api/update-birthday/${id}`, {
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
