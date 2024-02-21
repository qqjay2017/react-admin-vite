import { Route } from "react-router-dom";
import { CoreAdmin, CustomRoutes } from "./rc-admin";
import Settings from "./Settings";

const App = () => {
  return (
    <CoreAdmin basename="/base">
      {/* 没有菜单/头部的页面 */}
      <CustomRoutes noLayout>
        <Route path="/settings" element={<Settings />} />
      </CustomRoutes>
      {/* 有菜单/头部的页面 */}
      <CustomRoutes>
        <Route path="/settings" element={<Settings />} />
      </CustomRoutes>
      {/* 增删改查界面 */}
      <Resource list={<ListPage />} create={<CreatePage />} />
    </CoreAdmin>
  );
};

export default App;
