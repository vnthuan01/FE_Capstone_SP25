import { useMemo, useState } from 'react';
import Layout from '@/components/layout/UserLayout';
import { useServices } from '@/hooks/useService';
import { useFeedbacks, useServiceFeedbacks, useUpdateFeedbackStatus } from '@/hooks/useFeedback';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Star } from 'lucide-react';
import type { Feedback } from '@/services/feedbackService';
import { toast } from 'sonner';

const statusLabel = (status: number) => {
  switch (status) {
    case 2:
      return 'Resolved';
    case 1:
      return 'Reviewed';
    default:
      return 'New';
  }
};

const statusVariant = (status: number) => {
  if (status === 2) return 'success';
  if (status === 1) return 'warning';
  return 'info';
};

export default function FeedbackManagement() {
  const { data: servicesResponse, isLoading: servicesLoading } = useServices();
  const services = Array.isArray(servicesResponse)
    ? servicesResponse
    : Array.isArray(servicesResponse?.data)
      ? servicesResponse.data
      : [];

  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState<Feedback | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [statusValue, setStatusValue] = useState('0');

  const parsedStatus = statusFilter === 'all' ? undefined : Number(statusFilter);

  // Fetch tất cả feedback khi chưa chọn service
  const {
    data: allFeedbacks = [],
    isLoading: allLoading,
    refetch: refetchAll,
  } = useFeedbacks(parsedStatus);

  // Fetch feedback theo service khi admin chọn service
  const {
    data: serviceFeedbacks = [],
    isLoading: serviceLoading,
    refetch: refetchService,
  } = useServiceFeedbacks(selectedServiceId, parsedStatus);

  // Chọn dữ liệu để render
  const feedbacks = selectedServiceId ? serviceFeedbacks : allFeedbacks;
  const isLoading = selectedServiceId ? serviceLoading : allLoading;
  // const refetch = selectedServiceId ? refetchService : refetchAll;

  const filteredFeedbacks = useMemo(() => {
    if (statusFilter === 'all') return feedbacks;
    return feedbacks.filter((f) => f.status === Number(statusFilter));
  }, [feedbacks, statusFilter]);

  const handleOpenDialog = (feedback: Feedback) => {
    setActiveFeedback(feedback);
    setReplyMessage('');
    setSelectedServiceId(feedback.serviceId);
    setStatusValue(String(feedback.status));
    setDialogOpen(true);
  };

  const updateFeedbackStatusMutation = useUpdateFeedbackStatus();

  const handleSubmit = async () => {
    if (!activeFeedback) return;
    if (!selectedServiceId) {
      toast.error('Service is required to update feedback');
      return;
    }

    await updateFeedbackStatusMutation.mutateAsync({
      feedbackId: activeFeedback.id,
      serviceId: selectedServiceId,
      status: parsedStatus,
      payload: {
        status: Number(statusValue),
        replyMessage,
      },
    });

    setDialogOpen(false);
    setReplyMessage('');

    // refetch tương ứng
    if (selectedServiceId) {
      refetchService();
    } else {
      refetchAll();
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Customer feedback</h1>
            <p className="text-sm text-muted-foreground">
              Moderate new submissions (status 0) and close the loop with customers.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Select
            value={selectedServiceId ?? 'all'}
            onValueChange={(value) => setSelectedServiceId(value === 'all' ? undefined : value)}
            disabled={servicesLoading || services.length === 0}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Choose service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All services</SelectItem> {/* <-- thêm tùy chọn All */}
              {services
                .filter((s) => s.id)
                .map((service) => (
                  <SelectItem key={service.id} value={service.id!}>
                    {service.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="0">New</SelectItem>
              <SelectItem value="1">Reviewed</SelectItem>
              <SelectItem value="2">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && filteredFeedbacks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                    No feedback found for this filter.
                  </TableCell>
                </TableRow>
              )}
              {filteredFeedbacks.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">
                    <div>{f.userName}</div>
                    <div className="text-xs text-muted-foreground">{f.serviceName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < f.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(f.status)}>{statusLabel(f.status)}</Badge>
                  </TableCell>
                  <TableCell className="max-w-sm text-sm text-muted-foreground line-clamp-3">
                    {f.message}
                  </TableCell>
                  <TableCell>{new Date(f.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleOpenDialog(f)}>
                      Respond
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feedback response</DialogTitle>
          </DialogHeader>
          {activeFeedback && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{activeFeedback.userName}</p>
                <p>{activeFeedback.message}</p>
              </div>
              <Select value={statusValue} onValueChange={setStatusValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Update status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">New</SelectItem>
                  <SelectItem value="1">Mark at Reviewed</SelectItem>
                  <SelectItem value="2">Mark at Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                rows={4}
                placeholder="Optional reply that will be sent to the customer..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={updateFeedbackStatusMutation.isPending}>
              {updateFeedbackStatusMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                </>
              ) : (
                'Update'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
