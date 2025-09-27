import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { GlobalStyle } from "./styles/GlobalStyles";
import Chat from "./components/Chat/Chat";
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
import BudgetsList from "./components/Budgets/BudgetsList/BudgetsList";
import BudgetForm from "./components/Budgets/BudgetForm/BudgetForm";
import BudgetDetail from "./components/Budgets/BudgetDetail/BudgetDetail";
import ProjectsDashboard from "./components/Projects/ProjectsDashboard/ProjectsDashboard";
import ProjectsList from "./components/Projects/ProjectsList/ProjectsList";
import ProjectForm from "./components/Projects/ProjectForm/ProjectForm";
import ProjectKanban from "./components/Projects/ProjectKanban/ProjectKanban";
import FinancialDashboard from "./components/Financial/FinancialDashboard/FinancialDashboard";
import TransactionsList from "./components/Financial/TransactionsList/TransactionsList";
import TransactionForm from "./components/Financial/TransactionForm/TransactionForm";

const isAuthenticated = () => {
  return localStorage.getItem('techsync-authenticated') === 'true';
};

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
        <Route
          path="/orcamentos"
          element={
            <PrivateRoute>
              <BudgetsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/orcamentos/novo"
          element={
            <PrivateRoute>
              <BudgetForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/orcamentos/:id"
          element={
            <PrivateRoute>
              <BudgetDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/orcamentos/:id/editar"
          element={
            <PrivateRoute>
              <BudgetForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/projetos/dashboard"
          element={
            <PrivateRoute>
              <ProjectsDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/projetos"
          element={
            <PrivateRoute>
              <ProjectsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/projetos/novo"
          element={
            <PrivateRoute>
              <ProjectForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/projetos/:id/editar"
          element={
            <PrivateRoute>
              <ProjectForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/projetos/:id"
          element={
            <PrivateRoute>
              <ProjectKanban />
            </PrivateRoute>
          }
        />
        <Route
          path="/financeiro"
          element={
            <PrivateRoute>
              <FinancialDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/financeiro/transacoes"
          element={
            <PrivateRoute>
              <TransactionsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/financeiro/nova-transacao"
          element={
            <PrivateRoute>
              <TransactionForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/financeiro/transacoes/:id/editar"
          element={
            <PrivateRoute>
              <TransactionForm />
            </PrivateRoute>
          }
        />
      </Routes>
      
      {/* Chat disponível em todas as páginas quando logado */}
      {isAuthenticated() && <Chat />}
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