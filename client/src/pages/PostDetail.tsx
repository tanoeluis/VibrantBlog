import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Post } from "@shared/schema";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import PostForm from "@/components/PostForm";
import DeletePostDialog from "@/components/DeletePostDialog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PostDetail() {
  const { id } = useParams();
  const [location, setLocation] = useLocation();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: post, isLoading, error } = useQuery<Post>({
    queryKey: [`/api/posts/${id}`],
  });

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
            Error loading post
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {error instanceof Error ? error.message : "Post not found"}
          </p>
          <button
            onClick={() => setLocation("/")}
            className="mt-6 inline-flex items-center text-sm font-medium text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="px-4 sm:px-6 lg:px-8 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => setLocation("/")}
          className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to posts
        </button>

        <div className="flex space-x-2">
          <button
            onClick={() => setShowEditForm(true)}
            className="flex items-center px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </button>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="flex items-center px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </button>
        </div>
      </div>

      <article className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
        <img
          className="w-full h-64 sm:h-80 md:h-96 object-cover"
          src={post.imageUrl}
          alt={post.title}
        />

        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-2">
              {post.category}
            </span>
            <time dateTime={post.createdAt?.toString()} className="mr-4">
              {post.createdAt
                ? formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })
                : "Recently"}
            </time>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-6">{post.title}</h1>

          <div className="flex items-center mb-8">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Author avatar"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {post.author}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Author
              </p>
            </div>
          </div>

          <div className="prose prose-blue dark:prose-invert max-w-none markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      <PostForm
        isOpen={showEditForm}
        onClose={() => setShowEditForm(false)}
        initialData={post}
      />

      <DeletePostDialog
        isOpen={showDeleteDialog}
        postId={post.id}
        onClose={() => setShowDeleteDialog(false)}
      />
    </motion.div>
  );
}
