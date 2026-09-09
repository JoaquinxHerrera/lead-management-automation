import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom"

import LeadForm from "./pages/LeadForm"
import LeadDashboard from "./pages/LeadDashboard"
import LeadDetails from "./pages/LeadDetails"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LeadForm />}
        />

        <Route
          path="/dashboard"
          element={<LeadDashboard />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
        <Route
        path="/leads/:id"
        element={<LeadDetails />}
      />
      </Routes>
    </BrowserRouter>
  )
}

export default App