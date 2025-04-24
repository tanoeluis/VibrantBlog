import { Home, Edit3, Bookmark, User } from "lucide-react";
import { useLocation, Link } from "wouter";

export default function MobileNav() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex z-10">
      <Link href="/">
        <a className={`flex-1 flex flex-col items-center justify-center h-16 ${isActive("/") ? "text-primary" : "text-gray-600 dark:text-gray-400"}`}>
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </a>
      </Link>
      <Link href="/my-posts">
        <a className={`flex-1 flex flex-col items-center justify-center h-16 ${isActive("/my-posts") ? "text-primary" : "text-gray-600 dark:text-gray-400"}`}>
          <Edit3 className="h-5 w-5" />
          <span className="text-xs mt-1">My Posts</span>
        </a>
      </Link>
      <Link href="/saved">
        <a className={`flex-1 flex flex-col items-center justify-center h-16 ${isActive("/saved") ? "text-primary" : "text-gray-600 dark:text-gray-400"}`}>
          <Bookmark className="h-5 w-5" />
          <span className="text-xs mt-1">Saved</span>
        </a>
      </Link>
      <Link href="/profile">
        <a className={`flex-1 flex flex-col items-center justify-center h-16 ${isActive("/profile") ? "text-primary" : "text-gray-600 dark:text-gray-400"}`}>
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </a>
      </Link>
    </nav>
  );
}
