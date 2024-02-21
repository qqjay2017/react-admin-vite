import { Layout } from "antd";
import React, { Children, PropsWithChildren, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useConfigureAdminRouterFromChildren } from "./useConfigureAdminRouterFromChildren";
export interface CoreAdminRoutesProps extends PropsWithChildren {}

export const CoreAdminRoutes = (props: CoreAdminRoutesProps) => {
  const { children } = props;
  const [canRender, setCanRender] = useState(true);
  const { customRoutesWithoutLayout, status } =
    useConfigureAdminRouterFromChildren({
      children: props.children,
    });
  console.log(
    status,
    customRoutesWithoutLayout,
    "status",
    "customRoutesWithoutLayout"
  );
  if (status === "empty") {
    return <div>empty</div>;
  }
  if (status === "loading" || !canRender) {
    return (
      <Routes>
        {customRoutesWithoutLayout}
        <Route
          path="*"
          element={
            <div style={{ height: "100vh" }}>
              <div>loading</div>
            </div>
          }
        />
      </Routes>
    );
  }
  return (
    <Routes>
      {/*
                Render the custom routes that were outside the child function.
            */}
      {customRoutesWithoutLayout}
      <Route
        path="/*"
        element={
          <div>
            <Layout>
              <Routes>
                {/* {Children.map(children, (resource) => (
                  <Route
                    key={resource.props.name}
                    path={`${resource.props.name}/*`}
                    element={resource}
                  />
                ))} */}
                {/* <Route
                  path="/"
                  element={
                    dashboard ? (
                      <WithPermissions
                        authParams={defaultAuthParams}
                        component={dashboard}
                      />
                    ) : resources.length > 0 ? (
                      <Navigate
                        to={createPath({
                          resource: resources[0].props.name,
                          type: "list",
                        })}
                      />
                    ) : null
                  }
                /> */}
                {/* <Route path="*" element={<CatchAll title={title} />} /> */}
              </Routes>
            </Layout>
          </div>
        }
      />
    </Routes>
  );
};
