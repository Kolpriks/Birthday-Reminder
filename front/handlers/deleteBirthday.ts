export async function deleteBirthday(id: number) {
	const response = await fetch(`http://localhost:8080/api/delete-birthday/${id}`, {
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
