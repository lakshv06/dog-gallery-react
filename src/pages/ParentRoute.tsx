import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

function ParentRoute(): ReactElement {
  return (
    <div className="d-flex justify-content-around">
      <div>Hey, I am called from Parent Route.</div>
      <Outlet />
    </div>
  );
}

export default ParentRoute;
