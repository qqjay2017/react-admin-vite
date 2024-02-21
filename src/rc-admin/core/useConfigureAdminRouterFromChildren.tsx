import React, {
  Children,
  Dispatch,
  Fragment,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  SetStateAction,
  isValidElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  AdminRouterStatus,
  ResourceProps,
  ResourceWithRegisterFunction,
  RoutesAndResources,
} from "../types";
import { CustomRoutesProps } from ".";
import { useSafeSetState } from "../util";

const getRoutesAndResourceFromNodes = (
  children: ReactNode
): RoutesAndResources => {
  const customRoutesWithLayout: any[] = [];
  const customRoutesWithoutLayout: any[] = [];
  const resources: any[] = [];
  Children.forEach(children, (element) => {
    if (!React.isValidElement(element)) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      return;
    }
    if (element.type === Fragment) {
      const customRoutesFromFragment = getRoutesAndResourceFromNodes(
        element.props.children
      );
      customRoutesWithLayout.push(
        ...customRoutesFromFragment.customRoutesWithLayout
      );
      customRoutesWithoutLayout.push(
        ...customRoutesFromFragment.customRoutesWithoutLayout
      );
      resources.push(...customRoutesFromFragment.resources);
    }

    if ((element.type as any).raName === "CustomRoutes") {
      const customRoutesElement = element as ReactElement<CustomRoutesProps>;

      if (customRoutesElement.props.noLayout) {
        customRoutesWithoutLayout.push(customRoutesElement.props.children);
      } else {
        customRoutesWithLayout.push(customRoutesElement.props.children);
      }
    } else if ((element.type as any).raName === "Resource") {
      resources.push(element as ReactElement<ResourceProps>);
    }
  });

  return {
    customRoutesWithLayout,
    customRoutesWithoutLayout,
    resources,
  };
};

/*
 * A hook that store the routes and resources just like setState but also provides an additional function
 * to merge new routes and resources with the existing ones.
 */
const useRoutesAndResourcesState = (
  initialState: RoutesAndResources
): [
  RoutesAndResources,
  Dispatch<SetStateAction<RoutesAndResources>>,
  (newRoutesAndResources: RoutesAndResources) => void
] => {
  const [routesAndResources, setRoutesAndResources] = useState(initialState);

  const mergeRoutesAndResources = useCallback(
    (newRoutesAndResources: RoutesAndResources) => {
      setRoutesAndResources((previous) => ({
        customRoutesWithLayout: previous.customRoutesWithLayout.concat(
          newRoutesAndResources.customRoutesWithLayout
        ),
        customRoutesWithoutLayout: previous.customRoutesWithoutLayout.concat(
          newRoutesAndResources.customRoutesWithoutLayout
        ),
        resources: previous.resources.concat(newRoutesAndResources.resources),
      }));
    },
    []
  );

  return [routesAndResources, setRoutesAndResources, mergeRoutesAndResources];
};

const getStatus = ({
  children,
  resources,
  customRoutesWithLayout,
  customRoutesWithoutLayout,
}: {
  children: ReactNode;
  resources: ReactElement<ResourceProps>[];
  customRoutesWithLayout: ReactElement<CustomRoutesProps>[];
  customRoutesWithoutLayout: ReactElement<CustomRoutesProps>[];
}): "loading" | "empty" | "ready" => {
  console.log(children, "children");
  return "ready";
};

const useRoutesAndResourcesFromChildren = ({
  permissions,
  isLoading,
  children,
}: {
  permissions?: any[];
  isLoading?: boolean;
} & PropsWithChildren): [RoutesAndResources, AdminRouterStatus] => {
  const rAndR = getRoutesAndResourceFromNodes(children);
  console.log(rAndR, "rAndR");
  const [routesAndResources, setRoutesAndResources, mergeRoutesAndResources] =
    useRoutesAndResourcesState(rAndR);
  const [status = "loading", setStatus] = useSafeSetState<AdminRouterStatus>(
    () =>
      getStatus({
        children,
        ...routesAndResources,
      })
  );

  useEffect(() => {
    console.log("监听动态children");
  }, [
    children,
    isLoading,
    mergeRoutesAndResources,
    permissions,
    setRoutesAndResources,
    setStatus,
  ]);

  return [routesAndResources, status];
};

export const useConfigureAdminRouterFromChildren = ({
  children,
}: PropsWithChildren) => {
  // Whenever children are updated, update our custom routes and resources
  const [routesAndResources, status] = useRoutesAndResourcesFromChildren({
    children,
    permissions: [],
    isLoading: false,
  });
  return {
    customRoutesWithoutLayout: routesAndResources.customRoutesWithoutLayout,
    status,
  };
};
