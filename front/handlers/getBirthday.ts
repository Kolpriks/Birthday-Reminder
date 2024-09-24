export async function getBirthday(birthdayId: string) {
    const response = await fetch(`http://localhost:8080/api/birthday/${birthdayId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Не удалось получить данные дня рождения");
    }

    return await response.json();
}
