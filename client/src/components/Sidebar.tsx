import { useLocation, Link } from "wouter";
import { Home, Edit3, Bookmark, Settings } from "lucide-react";

const userProfile = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};

export default function Sidebar() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/my-posts", label: "My Posts", icon: Edit3 },
    { path: "/saved", label: "Saved", icon: Bookmark },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex md:w-64 flex-col fixed inset-y-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-10">
      <div className="flex flex-col h-full">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800">
          <Link href="/">
            <a className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold">
                V
              </div>
              <h1 className="text-xl font-bold ml-2">Vlog</h1>
            </a>
          </Link>
        </div>

        <nav className="flex-1 p-5 space-y-1">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.path)
                    ? "bg-gray-100 dark:bg-gray-800 text-primary"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.label}
              </a>
            </Link>
          ))}
        </nav>

        <div className="p-5 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <img
              src={userProfile.avatar}
              alt="User avatar"
              className="h-8 w-8 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium">{userProfile.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{userProfile.email}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
