import { Link } from "@remix-run/react";

export default function Header() {
    return (
        <header className="bg-green-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-3xl font-bold">Birthday Reminder</h1>
                <nav className="space-x-4">
                    <Link to="/" className="text-white hover:bg-green-600 px-4 py-2 rounded">
                        Главная
                    </Link>
                    <Link to="/profile" className="text-white hover:bg-green-600 px-4 py-2 rounded">
                        Профиль
                    </Link>
                    <Link to="/add-birthday" className="text-white hover:bg-green-600 px-4 py-2 rounded">
                        Добавить запись
                    </Link>
                </nav>
            </div>
        </header>
    );
}
