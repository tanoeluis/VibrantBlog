import { useQuery } from "@tanstack/react-query";
import { Post } from "@shared/schema";
import { useState } from "react";
import { Sliders, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import FeaturedPost from "@/components/FeaturedPost";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import PostForm from "@/components/PostForm";

export default function Home() {
  const [showPostForm, setShowPostForm] = useState(false);
  const [postsToShow, setPostsToShow] = useState(6);

  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Recent Posts</h1>
        </div>
        <div className="animate-pulse space-y-8">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
            Error loading posts
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {error instanceof Error ? error.message : "Unknown error occurred"}
          </p>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Recent Posts</h1>
          <Button onClick={() => setShowPostForm(true)}>Create First Post</Button>
        </div>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold mb-2">No posts found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get started by creating your first blog post
          </p>
          <PostForm isOpen={showPostForm} onClose={() => setShowPostForm(false)} />
        </div>
      </div>
    );
  }

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);
  const visiblePosts = remainingPosts.slice(0, postsToShow);

  const loadMorePosts = () => {
    setPostsToShow(Math.min(postsToShow + 3, remainingPosts.length));
  };

  return (
    <motion.div
      className="px-4 sm:px-6 lg:px-8 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Recent Posts</h1>

        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Sliders className="h-4 w-4 mr-1" />
            Filter
          </button>
          <button
            onClick={() => setShowPostForm(true)}
            className="md:hidden flex items-center px-3 py-1.5 text-sm border border-transparent rounded-md bg-primary text-white hover:bg-blue-700"
          >
            <span className="sr-only">New post</span>
            +
          </button>
        </div>
      </div>

      {/* Featured Post */}
      <FeaturedPost post={featuredPost} />

      {/* Grid of Posts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {/* Load More Button */}
      {postsToShow < remainingPosts.length && (
        <div className="mt-10 text-center">
          <button
            onClick={loadMorePosts}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Load more posts
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </div>
      )}

      <PostForm isOpen={showPostForm} onClose={() => setShowPostForm(false)} />
    </motion.div>
  );
}
