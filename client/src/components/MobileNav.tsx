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
        <div className={`flex-1 flex flex-col items-center justify-center h-16 cursor-pointer ${isActive("/") ? "text-primary" : "text-gray-600 dark:text-gray-400"}`}>
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </div>
      </Link>
      <Link href="/my-posts">
        <div className={`flex-1 flex flex-col items-center justify-center h-16 cursor-pointer ${isActive("/my-posts") ? "text-primary" : "text-gray-600 dark:text-gray-400"}`}>
          <Edit3 className="h-5 w-5" />
          <span className="text-xs mt-1">My Posts</span>
        </div>
      </Link>
      <Link href="/saved">
        <div className={`flex-1 flex flex-col items-center justify-center h-16 cursor-pointer ${isActive("/saved") ? "text-primary" : "text-gray-600 dark:text-gray-400"}`}>
          <Bookmark className="h-5 w-5" />
          <span className="text-xs mt-1">Saved</span>
        </div>
      </Link>
      <Link href="/profile">
        <div className={`flex-1 flex flex-col items-center justify-center h-16 cursor-pointer ${isActive("/profile") ? "text-primary" : "text-gray-600 dark:text-gray-400"}`}>
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </div>
      </Link>
    </nav>
  );
}
