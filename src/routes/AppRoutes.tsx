import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../features/Home";
import Play from "../features/Play";
import Dashboard from "../features/Dashboard";
import Auth from "../features/Auth";
import { loadSession } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../features/NotFound";
import { AppDispatch, RootState } from "../store";
import { fetchTreasures } from "../store/slices/treasuresSlice";
import LoadingPage from "../components/Loading";

const AppRoutes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, treasures } = useSelector(
    (state: RootState) => state.treasures
  );

  useEffect(() => {
    dispatch(loadSession());
    if (treasures.length === 0) dispatch(fetchTreasures());
  }, [dispatch, treasures.length]);

  if (status === "loading") {
    return <LoadingPage />;
  }

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
