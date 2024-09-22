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

  return (
    <div className="container">
      <header className="header">
        {userAuthenticated ? (
          <>
            <h1>Birthday Reminder</h1>
            <Link to="/add-birthday" className="button">
              Добавить запись
            </Link>
            <Link to="/profile" className="button">
              Профиль
            </Link>
          </>
        ) : (
          <Link to="/login" className="button">
            Авторизоваться
          </Link>
        )}
      </header>

      <main>
        {userAuthenticated ? (
          <div>
            {birthdays.length > 0 ? (
              birthdays.map((birthday) => (
                <div key={birthday.id}>
                  <Link to={`/birthday/${birthday.first_name}-${birthday.last_name}-${birthday.birthdate}`}>
                    {birthday.first_name} {birthday.last_name} - {new Date(birthday.birthdate).toLocaleDateString()}
                  </Link>
                </div>
              ))
            ) : (
              <p>Нет записей</p>
            )}
          </div>
        ) : (
          <p>Пожалуйста, авторизуйтесь, чтобы просмотреть записи о днях рождения.</p>
        )}
      </main>
    </div>
  );
}
