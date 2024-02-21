import React, { PropsWithChildren } from "react";
import { Routes, Route } from "react-router-dom";
import { CoreAdminRoutes } from "./CoreAdminRoutes";
export interface CoreAdminUIProps extends PropsWithChildren {}
export const CoreAdminUI = (props: CoreAdminUIProps) => {
  const { children } = props;
  return (
    <Routes>
      <Route
        path="/*"
        element={<CoreAdminRoutes>{children}</CoreAdminRoutes>}
      />
    </Routes>
  );
};
