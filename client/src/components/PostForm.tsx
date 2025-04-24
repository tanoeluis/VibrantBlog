import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPostSchema } from "@/shared/schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Post } from "@shared/schema";
import { Image, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PostFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Post;
}

const formSchema = insertPostSchema.extend({
  imageUrl: z.string().default("https://images.unsplash.com/photo-1498050108023-c5249f4df085"),
});

type FormValues = z.infer<typeof formSchema>;

const categories = [
  "Technology",
  "React",
  "Performance",
  "UI/UX",
  "Architecture",
  "Markdown",
];

export default function PostForm({ isOpen, onClose, initialData }: PostFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [previewContent, setPreviewContent] = useState(false);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      content: "",
      summary: "",
      author: "John Doe",
      category: "Technology",
      readTime: "3 min read",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
  });

  // Reset form when initialData changes or when the modal opens
  useEffect(() => {
    if (isOpen) {
      reset(initialData || {
        title: "",
        content: "",
        summary: "",
        author: "John Doe",
        category: "Technology",
        readTime: "3 min read",
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      });
      setPreviewContent(false);
    }
  }, [isOpen, initialData, reset]);

  const createMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await apiRequest("POST", "/api/posts", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "Success",
        description: "Post created successfully",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create post",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: FormValues & { id: number }) => {
      const { id, ...postData } = data;
      const res = await apiRequest("PATCH", `/api/posts/${id}`, postData);
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      queryClient.invalidateQueries({ queryKey: [`/api/posts/${variables.id}`] });
      toast({
        title: "Success",
        description: "Post updated successfully",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update post",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    if (initialData?.id) {
      updateMutation.mutate({ ...data, id: initialData.id });
    } else {
      createMutation.mutate(data);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;
  const content = watch("content");

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {initialData ? "Edit Post" : "Create New Post"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your post title"
                  {...register("title")}
                  className="mt-1"
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value) => setValue("category", value)}
                  defaultValue={initialData?.category || "Technology"}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex justify-between">
                  <Label htmlFor="content">Content (Markdown)</Label>
                  <div className="space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewContent(!previewContent)}
                      className="text-xs"
                    >
                      {previewContent ? "Edit" : "Preview"}
                    </Button>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Markdown supported
                    </span>
                  </div>
                </div>
                <div className="mt-1">
                  {previewContent ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="min-h-[300px] p-3 border rounded-md overflow-y-auto prose dark:prose-invert max-w-none markdown-content"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  ) : (
                    <Textarea
                      id="content"
                      rows={12}
                      className="font-mono"
                      placeholder="Write your post content using Markdown..."
                      {...register("content")}
                    />
                  )}
                  {errors.content && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.content.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  placeholder="A brief summary of your post"
                  {...register("summary")}
                  className="mt-1"
                  rows={3}
                />
                {errors.summary && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.summary.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  placeholder="Your name"
                  {...register("author")}
                  className="mt-1"
                />
                {errors.author && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.author.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="readTime">Read Time</Label>
                <Input
                  id="readTime"
                  placeholder="e.g. 5 min read"
                  {...register("readTime")}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">Featured Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="Image URL"
                  {...register("imageUrl")}
                  className="mt-1"
                />
                {errors.imageUrl && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Saving..." : initialData ? "Update" : "Publish"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
