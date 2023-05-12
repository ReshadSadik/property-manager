import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ALL_ROUTES } from "./shared/routes";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ContextProviderContainer } from "./components/ContextProviderContainer";
import {
  DashboardContainer,
  Dashboard,
  Login,
  NotFound,
  AllProperties,
  // MyProfile,
  // AgentProfile,
  Agents,
  CreateProperty,
  EditProperty,
  PropertyDetails,
} from "./pages";

function App() {
  return (
    <div className="App">
      <ContextProviderContainer>
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
              <Route
                path={`${ALL_ROUTES.PROPERTIES}/edit/:id`}
                element={<EditProperty />}
              ></Route>
              <Route
                path={`${ALL_ROUTES.PROPERTIES}/view/:id`}
                element={<PropertyDetails />}
              ></Route>
              <Route path={ALL_ROUTES.AGENTS} element={<Agents />}></Route>
              <Route index element={<Dashboard />}></Route>
            </Route>
          </Route>
          <Route />
          <Route />
        </Routes>
      </ContextProviderContainer>
    </div>
  );
}

export default App;
