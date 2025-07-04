import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { GlobalStyle } from "./styles/GlobalStyles";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import HomePage from "./components/HomePage/HomePage";
import Perfil from "./components/Perfil/Perfil";
import Configuracoes from "./components/Configuracoes/Configuracoes";
import ClientsList from "./components/Clients/ClientsList/ClientsList";
import ClientForm from "./components/Clients/ClientForm/ClientForm";
import ClientDetail from "./components/Clients/ClientDetail/ClientDetail";

const AppContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <>
      <GlobalStyle $isDarkMode={isDarkMode} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <ClientsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes/novo"
          element={
            <PrivateRoute>
              <ClientForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes/:id"
          element={
            <PrivateRoute>
              <ClientDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes/:id/editar"
          element={
            <PrivateRoute>
              <ClientForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;