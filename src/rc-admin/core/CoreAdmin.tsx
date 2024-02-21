import React from "react";
import { CoreAdminContext, CoreAdminContextProps } from "./CoreAdminContext";
import { CoreAdminUI, CoreAdminUIProps } from "./CoreAdminUI";

export const CoreAdmin = (props: CoreAdminProps) => {
  const { children, basename } = props;

  return (
    <CoreAdminContext basename={basename}>
      <CoreAdminUI>{children}</CoreAdminUI>
    </CoreAdminContext>
  );
};

export type CoreAdminProps = CoreAdminContextProps & CoreAdminUIProps;
