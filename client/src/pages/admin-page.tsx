import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import PostForm from "@/components/PostForm";
import DeletePostDialog from "@/components/DeletePostDialog";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";

export default function AdminPage() {
  const { user } = useAuth();
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { toast } = useToast();

  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  // Redirect ke halaman auth jika user belum login
  if (!user) {
    return <Redirect to="/auth" />;
  }

  function handleEditPost(post: Post) {
    setSelectedPost(post);
    setIsPostFormOpen(true);
  }

  function handleDeletePost(post: Post) {
    setSelectedPost(post);
    setIsDeleteDialogOpen(true);
  }

  function handlePostCreated() {
    setIsPostFormOpen(false);
    setSelectedPost(null);
    queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
    toast({
      title: "Berhasil!",
      description: "Post berhasil disimpan.",
    });
  }

  function handlePostDeleted() {
    setIsDeleteDialogOpen(false);
    setSelectedPost(null);
    queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
    toast({
      title: "Berhasil!",
      description: "Post berhasil dihapus.",
    });
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          <Button
            onClick={() => {
              setSelectedPost(null);
              setIsPostFormOpen(true);
            }}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Post Baru
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Gagal memuat data post. Silakan coba lagi nanti.
            </AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="space-y-4">
            <div className="h-24 bg-muted rounded-md animate-pulse" />
            <div className="h-24 bg-muted rounded-md animate-pulse" />
            <div className="h-24 bg-muted rounded-md animate-pulse" />
          </div>
        ) : (
          <div className="bg-card rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Judul</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Kategori</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Penulis</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Tanggal</th>
                    <th className="px-6 py-3 text-right text-sm font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {posts?.map((post) => (
                    <tr key={post.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4 text-sm">{post.id}</td>
                      <td className="px-6 py-4 text-sm font-medium">{post.title}</td>
                      <td className="px-6 py-4 text-sm">{post.category}</td>
                      <td className="px-6 py-4 text-sm">{post.author}</td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(post.createdAt).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPost(post)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeletePost(post)}
                        >
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {posts?.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-8 text-center text-muted-foreground"
                      >
                        Belum ada post. Klik 'Tambah Post Baru' untuk membuat post pertama.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Form untuk menambah/mengedit post */}
      <PostForm
        isOpen={isPostFormOpen}
        onClose={() => setIsPostFormOpen(false)}
        initialData={selectedPost}
        onSuccess={handlePostCreated}
      />

      {/* Dialog konfirmasi hapus */}
      <DeletePostDialog
        isOpen={isDeleteDialogOpen}
        postId={selectedPost?.id || 0}
        onClose={() => setIsDeleteDialogOpen(false)}
        onSuccess={handlePostDeleted}
      />
    </Layout>
  );
}