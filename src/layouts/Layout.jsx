import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="w-7xl mx-auto">
            <header className="border-b border-indigo-300 py-4 bg-indigo-50 px-4">
                <nav className="flex items-center justify-between">
                    <Link to="/" className="font-bold text-indigo-600 cursor-pointer">UAM Blog</Link>
                    <div>
                        <Link className="px-3 py-1 rounded-md hover:bg-indigo-600 hover:text-white cursor-pointer" to="/">Home</Link>
                        <Link className="px-3 py-1 rounded-md hover:bg-indigo-600 hover:text-white cursor-pointer" to="/create">New Post</Link>
                    </div>
                </nav>
            </header>
            <main className="container mx-auto px-8 py-8">
                <Outlet />
            </main>
            <footer className="border-t pt-4 text-center border-indigo-300 bg-indigo-50">
                <p className="text-sm text-gray-500">Copyright &copy; 2026</p>
            </footer>
        </div>
    )
}
