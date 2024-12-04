import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../features/Home";
import Play from "../features/Play";
import Dashboard from "../features/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Auth from "../features/Auth";
import NotFound from "../features/NotFound";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/play"
            element={
              <ProtectedRoute>
                <Play />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
