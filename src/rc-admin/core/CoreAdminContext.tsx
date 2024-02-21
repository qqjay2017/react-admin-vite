import React, { useMemo } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AdminRouter } from "../routing";
export interface CoreAdminContextProps {
  /**
   * This makes all links be prefixed with /admin.

Note that it is your responsibility to serve the admin from the sub path, e.g. by setting the base field in vite.config.ts if you use Vite.js, or the homepage field in package.json if you use Create React App.

If you want to use react-admin as a sub path of a larger React application, check the next section for instructions.
   */
  basename?: string;

  children?: any;
  queryClient?: QueryClient;
}

export const CoreAdminContext = (props: CoreAdminContextProps) => {
  const { queryClient, basename, children } = props;
  const finalQueryClient = useMemo(
    () => queryClient || new QueryClient(),
    [queryClient]
  );
  return (
    <QueryClientProvider client={finalQueryClient}>
      <AdminRouter basename={basename}>{children}</AdminRouter>
    </QueryClientProvider>
  );
};
