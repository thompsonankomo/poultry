import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider } from "./store";
import { Landing } from "./pages/Landing";
import { AdminLogin, AdminLayout } from "./components/AdminApp";

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </StoreProvider>
  );
}
