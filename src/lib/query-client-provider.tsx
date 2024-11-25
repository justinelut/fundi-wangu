import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider, QueryClientConfig } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Define props for the provider
interface QueryProviderProps {
  children: ReactNode; // Allows passing other components as children
}

// Create QueryClient configuration
const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 3, // Retry failed queries 3 times
      refetchOnWindowFocus: true, // Refetch when the app regains focus
      staleTime: 1000 * 10, // Consider queries fresh for 10 seconds
    },
  },
};

// Initialize the QueryClient
const queryClient = new QueryClient(queryClientConfig);

// Define the reusable QueryProvider component
const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  );
};

export default QueryProvider;
