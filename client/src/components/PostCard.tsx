import { Post } from "@shared/schema";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/posts/${post.id}`}>
        <a className="block h-full transition-all duration-300 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md">
          <div>
            <img
              className="w-full h-48 object-cover"
              src={post.imageUrl}
              alt={post.title}
            />
            <div className="p-5">
              <div className="flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {post.readTime}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-medium group-hover:text-primary transition-colors duration-200">
                {post.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
                {post.summary}
              </p>
              <div className="mt-4 flex items-center">
                <img
                  className="h-7 w-7 rounded-full"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
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
