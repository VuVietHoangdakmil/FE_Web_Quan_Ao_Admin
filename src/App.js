import DefaultLayout from "./components/Layouts/DefaultLayout";
import { publicRouters } from "./routers";

import { Routes, Route } from "react-router-dom";

function App() {
 

  return (
    <DefaultLayout>
      <Routes>
        {publicRouters.map(({ path, Page }) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
      </Routes>
    </DefaultLayout>
  );
}

export default App;
