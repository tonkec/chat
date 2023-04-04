import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "../components/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";
import HomePage from "../pages/HomePage";
import MessagesPage from "../pages/MessagesPage";
import MessagePage from "../pages/MessagePage";

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/poruka/:id" element={<MessagePage />} />
        <Route path="/poruke" element={<MessagesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default RoutesComponent;
