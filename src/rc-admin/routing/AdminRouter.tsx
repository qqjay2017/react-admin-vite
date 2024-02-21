import { PropsWithChildren, ReactNode } from "react";
import { BasenameContextProvider } from "./BasenameContextProvider";
import {
  BrowserRouter,
  HistoryRouterProps,
  useInRouterContext,
} from "react-router-dom";
import { History } from "history";

export interface AdminRouterProps extends PropsWithChildren {
  basename?: string;
  history?: any;
}
const DummyRouter = ({ children }: { children: ReactNode }) => <>{children}</>;
const InternalRouter = ({
  children,
  basename,
}: {
  history?: History;
} & Omit<HistoryRouterProps, "history">) => {
  // const finalHistory = useMemo(
  //   () => history || createBrowserHistory(),
  //   [history]
  // );

  return <BrowserRouter basename={basename}>{children}</BrowserRouter>;
};

export const AdminRouter = ({
  basename = "",
  children,
  history,
}: AdminRouterProps) => {
  const isInRouter = useInRouterContext();
  const Router = isInRouter ? DummyRouter : InternalRouter;

  return (
    <BasenameContextProvider basename={isInRouter ? basename : ""}>
      <Router basename={basename} history={history}>
        {children}
      </Router>
    </BasenameContextProvider>
  );
};
