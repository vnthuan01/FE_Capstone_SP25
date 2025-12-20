import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppRoutes from '@/routes/index';
import { ThemeProvider } from '@/components/provider/ThemeProvider';
// import { SignalRProvider } from '@/components/provider/signalr/SignalRProvider';
// import { ConnectionIndicator } from '@/components/provider/signalr/ConnectionIndicator';

// Tạo queryClient global
const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {/* <SignalRProvider> */}
        <AppRoutes />
        {/* <ConnectionIndicator /> */}
        {/* </SignalRProvider> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
