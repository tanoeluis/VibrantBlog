import { Post } from "@shared/schema";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.div 
      className="mb-10 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/posts/${post.id}`}>
        <a className="block transition-all duration-300 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-64"
                src={post.imageUrl}
                alt={post.title}
              />
            </div>
            <div className="p-6">
              <div className="flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {post.readTime}
                </span>
              </div>
              <h2 className="mt-3 text-xl font-semibold group-hover:text-primary transition-colors duration-200">
                {post.title}
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-3">
                {post.summary}
              </p>
              <div className="mt-4 flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Author avatar"
                />
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {post.author}
                  </p>
                  <div className="flex text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={post.createdAt?.toString()}>
                      {post.createdAt
                        ? formatDistanceToNow(new Date(post.createdAt), {
                            addSuffix: true,
                          })
                        : "Recently"}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </motion.div>
  );
}
