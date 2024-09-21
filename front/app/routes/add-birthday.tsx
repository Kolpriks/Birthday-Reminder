import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { createBirthday } from "handlers";

export default function AddBirthday() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await createBirthday(firstName, lastName, birthdate);
			navigate("/");
		} catch (err) {
			setError("Не удалось создать запись о дне рождения");
			console.error(err);
		}
	};

	return (
		<div className="container">
			<h1>Добавить запись о дне рождения</h1>
			{error && <p className="error">{error}</p>}
			<form onSubmit={handleSubmit}>
				<label>
					Имя:
					<input
						type="text"
						name="first_name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					Фамилия:
					<input
						type="text"
						name="last_name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label>
					Дата рождения:
					<input
						type="date"
						name="birthdate"
						value={birthdate}
						onChange={(e) => setBirthdate(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Создать</button>
			</form>
		</div>
	);
}
