import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import IssuesPage from "./pages/IssuesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateIssuePage from "./pages/CreateIssuePage";
import IssueDetailsPage from "./pages/IssueDetailPage";
import EditIssuePage from "./pages/EditIssuePage";

function App() {
  return (
    <BrowserRouter>
    <Routes>

  <Route
    path="/"
    element={
      <ProtectedRoute>
        <IssuesPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/create"
    element={
      <ProtectedRoute>
        <CreateIssuePage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/login"
    element={<LoginPage />}
  />

  <Route
    path="/register"
    element={<RegisterPage />}
  />

  <Route
    path="/issues/:id"
    element={
      <ProtectedRoute>
        <IssueDetailsPage />
      </ProtectedRoute>
    }
  />
<Route
  path="/issues/:id/edit"
  element={
    <ProtectedRoute>
      <EditIssuePage />
    </ProtectedRoute>
  }
/>
</Routes>
    </BrowserRouter>
  );
}

export default App;