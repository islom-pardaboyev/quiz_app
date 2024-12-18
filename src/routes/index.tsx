import { useRoutes } from "react-router";
import { Home, Quiz } from "../pages";

function CustomRoutes() {
  return (
    <main>
      {useRoutes([
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/quiz",
          element: <Quiz />,
        },
      ])}
    </main>
  );
}

export default CustomRoutes;
