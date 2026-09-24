import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client";
import { User } from "@supabase/supabase-js";

export interface MyRouterContext {
  queryClient: QueryClient;
  user?: User | null;
}

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  } as MyRouterContext,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 🟢 4. ส่ง context ผ่าน Provider */}
      <RouterProvider router={router} context={{ queryClient }} />
    </QueryClientProvider>
  );
}

export default App;
