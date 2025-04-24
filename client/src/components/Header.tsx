import { useState } from "react";
import { Menu, Search, Sun, Moon, Plus } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import PostForm from "./PostForm";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [location, setLocation] = useLocation();
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Mobile menu button and logo */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-5 w-5" />
            </button>
            <div className="ml-3 md:hidden flex items-center">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold">
                V
              </div>
              <h1 className="text-xl font-bold ml-2">Vlog</h1>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden sm:flex-1 sm:flex sm:justify-center max-w-lg mx-auto">
            <div className="w-full">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Search for posts"
                  type="search"
                />
              </div>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center">
            <Button
              onClick={() => setIsPostFormOpen(true)}
              className="hidden sm:inline-flex items-center"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              New Post
            </Button>

            <button
              onClick={toggleTheme}
              className="ml-3 p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <div className="ml-3 relative">
              <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search (visible on smaller screens) */}
        <div className="sm:hidden border-t border-gray-200 dark:border-gray-800 px-4 pb-4">
          <div className="pt-3">
            <label htmlFor="mobile-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="mobile-search"
                name="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search for posts"
                type="search"
              />
            </div>
          </div>
        </div>
      </header>

      <PostForm 
        isOpen={isPostFormOpen} 
        onClose={() => setIsPostFormOpen(false)} 
      />
    </>
  );
}
