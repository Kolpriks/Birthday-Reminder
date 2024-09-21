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
