import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { getUserBirthdays } from "handlers";

interface Birthday {
  id: number;
  first_name: string;
  last_name: string;
  birthdate: string;
}

export default function Index() {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUserAuthenticated(true);
      getUserBirthdays()
        .then((birthdaysData: Birthday[]) => {
          setBirthdays(birthdaysData);
        })
        .catch((error) => {
          console.error("Ошибка при получении дней рождения:", error);
        });
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA");
  };

  return (
    <div className="container mx-auto p-6">
      <header className="bg-green-500 text-white p-4 rounded-lg mb-8">
        {userAuthenticated ? (
          <>
            <h1 className="text-3xl font-bold mb-4">Birthday Reminder</h1>
            <div className="space-x-4">
              <Link to="/add-birthday" className="bg-white text-green-500 px-4 py-2 rounded hover:bg-green-600 hover:text-white transition">
                Добавить запись
              </Link>
              <Link to="/profile" className="bg-white text-green-500 px-4 py-2 rounded hover:bg-green-600 hover:text-white transition">
                Профиль
              </Link>
            </div>
          </>
        ) : (
          <Link to="/login" className="bg-white text-green-500 px-4 py-2 rounded hover:bg-green-600 hover:text-white transition">
            Авторизоваться
          </Link>
        )}
      </header>

      <main className="bg-white p-6 rounded-lg shadow-md">
        {userAuthenticated ? (
          <div>
            {birthdays.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {birthdays.map((birthday) => (
                  <div key={birthday.id} className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition">
                    <Link to={`/birthdays/${birthday.id}`} className="text-lg font-bold text-gray-700 hover:text-green-500">
                      {birthday.first_name} {birthday.last_name}
                    </Link>
                    <p className="text-sm text-gray-600">Дата рождения: {formatDate(birthday.birthdate)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">Нет записей</p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Пожалуйста, авторизуйтесь, чтобы просмотреть записи о днях рождения.</p>
        )}
      </main>
    </div>
  );
}
