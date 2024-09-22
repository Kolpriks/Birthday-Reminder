import { useLoaderData, Form } from "@remix-run/react";
import { getBirthday } from "handlers";

interface Birthday {
	first_name: string;
	last_name: string;
	birthdate: string;
}

interface LoaderParams {
	birthdaySlug: string;
}

export async function loader({ params }: { params: LoaderParams }) {
	const { birthdaySlug } = params;
	const [firstName, lastName, birthdate] = birthdaySlug.split("-");
	const birthday: Birthday = await getBirthday(firstName, lastName, birthdate);

	return { birthday };
}

export default function BirthdayDetail() {
	const { birthday } = useLoaderData<{ birthday: Birthday }>();

	return (
		<div className="container">
			<h1>Редактирование дня рождения</h1>
			<Form method="post" action={`/birthday/${birthday.first_name}-${birthday.last_name}-${birthday.birthdate}/edit`}>
				<label>
					Имя:
					<input type="text" name="first_name" defaultValue={birthday.first_name} required />
				</label>
				<label>
					Фамилия:
					<input type="text" name="last_name" defaultValue={birthday.last_name} required />
				</label>
				<label>
					Дата рождения:
					<input type="date" name="birthdate" defaultValue={birthday.birthdate} required />
				</label>
				<button type="submit">Сохранить изменения</button>
			</Form>
		</div>
	);
}
