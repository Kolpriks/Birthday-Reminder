import { useLoaderData, useNavigate } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import { getBirthday, updateBirthday } from "handlers";
import { useState } from "react";

interface Birthday {
	id: number;
	first_name: string;
	last_name: string;
	birthdate: string;
}

export const loader: LoaderFunction = async ({ params }) => {
	const { birthdayId } = params as { birthdayId: string };
	const birthday = await getBirthday(birthdayId);

	return json(birthday);
};

export default function Birthday() {
	const birthday = useLoaderData<Birthday>();
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState(birthday.first_name);
	const [lastName, setLastName] = useState(birthday.last_name);
	const [birthdate, setBirthdate] = useState(birthday.birthdate);
	const [error, setError] = useState<string | null>(null);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toISOString().split("T")[0];
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await updateBirthday(firstName, lastName, birthdate, birthday.id);
			navigate("/");
		} catch (err) {
			setError("Не удалось обновить день рождения");
			console.error(err);
		}
	};

	return (
		<div className="container mx-auto max-w-md p-6 bg-white shadow-lg rounded-lg mt-10">
			<h1 className="text-2xl font-bold mb-4 text-black">Редактирование дня рождения</h1>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			<form onSubmit={handleSubmit} className="space-y-4">
				<label className="block">
					<span className="text-gray-700">Имя:</span>
					<input
						type="text"
						name="first_name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
						required
					/>
				</label>
				<label className="block">
					<span className="text-gray-700">Фамилия:</span>
					<input
						type="text"
						name="last_name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
						required
					/>
				</label>
				<label className="block">
					<span className="text-gray-700">Дата рождения:</span>
					<input
						type="date"
						name="birthdate"
						value={formatDate(birthdate)}
						onChange={(e) => setBirthdate(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
						required
					/>
				</label>
				<button
					type="submit"
					className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
				>
					Сохранить изменения
				</button>
			</form>
		</div>
	);
}
