import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ALL_ROUTES } from "./shared/routes";
import { ProtectedRoute } from "./components/ProtectedRoute";
import {
  DashboardContainer,
  Dashboard,
  Login,
  NotFound,
  AllProperties,
  MyProfile,
  // AgentProfile,
  // Agents,
  CreateProperty,
  // EditProperty,
  // PropertyDetails,
} from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ALL_ROUTES.LOGIN} element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ALL_ROUTES.HOME} element={<DashboardContainer />}>
              <Route
                path={ALL_ROUTES.PROPERTIES}
                element={<AllProperties />}
              ></Route>
              <Route
                path={`${ALL_ROUTES.PROPERTIES}/create`}
                element={<CreateProperty />}
              ></Route>
              <Route index element={<Dashboard />}></Route>
            </Route>
          </Route>
          <Route />
          <Route />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
