import { AdminRouterProps } from "./AdminRouter";
import { BasenameContext } from "./BasenameContext";

/**
 * Set the string to append to all links to the admin app.
 *
 * Useful when the app is mounted on a sub path, e.g. '/admin'.
 * Used internally by the `<Admin>` component.
 *
 * @see useBasename
 */
export const BasenameContextProvider = ({
  children,
  basename,
}: AdminRouterProps) => (
  <BasenameContext.Provider value={basename || ""}>
    {children}
  </BasenameContext.Provider>
);
