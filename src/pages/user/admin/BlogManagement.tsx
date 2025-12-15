import { useMemo, useState } from 'react';
import Layout from '@/components/layout/UserLayout';
import { useBlogs, useDeleteBlog, useUpdateBlogStatus } from '@/hooks/useBlog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Loader2, RefreshCw } from 'lucide-react';

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Draft ', value: '0' },
  { label: 'Pending', value: '1' },
  { label: 'Published ', value: '2' },
  { label: 'Archived ', value: '3' },
];

const statusBadgeVariant = (status: number) => {
  switch (status) {
    case 2:
      return 'success';
    case 1:
      return 'warning';
    case 0:
    default:
      return 'outline';
  }
};

const statusLabel = (status: number) => {
  switch (status) {
    case 2:
      return 'Published';
    case 1:
      return 'Pending';
    case 3:
      return 'Archived';
    default:
      return 'Draft';
  }
};

export default function BlogManagement() {
  const [page] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { data, isLoading, refetch, isFetching } = useBlogs({ page, pageSize: 20, search });
  const updateStatusMutation = useUpdateBlogStatus();
  const deleteBlogMutation = useDeleteBlog();

  const filteredBlogs = useMemo(() => {
    const items = data?.items ?? [];
    if (statusFilter === 'all') {
      return items;
    }
    const statusNumber = Number(statusFilter);
    return items.filter((blog) => blog.status === statusNumber);
  }, [data?.items, statusFilter]);

  const handleStatusChange = (blogId: string, status: number) => {
    updateStatusMutation.mutate({ id: blogId, status });
  };

  const handleDelete = (blogId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmed) return;
    deleteBlogMutation.mutate(blogId);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Blog management</h1>
            <p className="text-sm text-muted-foreground">
              Review submissions and update their publication status.
            </p>
          </div>
          <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Search by title or author"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="max-w-sm"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && filteredBlogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                    No blogs found for the current filter.
                  </TableCell>
                </TableRow>
              )}

              {filteredBlogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell className="max-w-xs">
                    <p className="font-medium">{blog.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{blog.excerpt}</p>
                  </TableCell>
                  <TableCell>{blog.authorName}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(blog.status)}>
                      {statusLabel(blog.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Select
                        value={String(blog.status)}
                        onValueChange={(value) => handleStatusChange(blog.id, Number(value))}
                        disabled={updateStatusMutation.isPending}
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3].map((status) => (
                            <SelectItem key={status} value={String(status)}>
                              {statusLabel(status)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(blog.id)}
                        disabled={deleteBlogMutation.isPending}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
