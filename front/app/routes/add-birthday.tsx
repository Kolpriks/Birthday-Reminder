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
		<div className="container mx-auto max-w-md p-6 bg-white shadow-lg rounded-lg mt-10">
			<h1 className="text-2xl font-bold mb-4 text-black " >Добавить запись о дне рождения</h1>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			<form onSubmit={handleSubmit} className="space-y-4">
				<label className="block">
					<span className="text-gray-700">Имя:</span>
					<input
						type="text"
						name="first_name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
				</label>
				<label className="block">
					<span className="text-gray-700">Фамилия:</span>
					<input
						type="text"
						name="last_name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
				</label>
				<label className="block">
					<span className="text-gray-700">Дата рождения:</span>
					<input
						type="date"
						name="birthdate"
						value={birthdate}
						onChange={(e) => setBirthdate(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
				</label>
				<button
					type="submit"
					className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
				>
					Создать
				</button>
			</form>
		</div>
	);
}
