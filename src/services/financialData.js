// Serviço para dados financeiros reais
export const financialService = {
  // Função para buscar métricas financeiras da API
  getMetrics: async () => {
    // TODO: Implementar chamada para API real
    // return await api.get('/api/financeiro/metricas');
    return {
      totalReceitas: 0,
      receitasPagas: 0,
      receitasPendentes: 0,
      totalDespesas: 0,
      despesasPagas: 0,
      despesasPendentes: 0,
      lucroLiquido: 0,
      margemLucro: 0,
      saldoDisponivel: 0
    };
  },

  // Função para buscar dados dos gráficos
  getChartData: async () => {
    // TODO: Implementar chamada para API real
    // return await api.get('/api/financeiro/graficos');
    return {
      revenueExpenseData: [],
      projectRevenueData: [],
      expensesByCategory: [],
      cashFlowData: []
    };
  },

  // Função para buscar transações recentes
  getRecentTransactions: async () => {
    // TODO: Implementar chamada para API real
    // return await api.get('/api/financeiro/transacoes/recentes');
    return [];
  },

  // Função para buscar todas as transações
  getAllTransactions: async () => {
    // TODO: Implementar chamada para API real
    // return await api.get('/api/financeiro/transacoes');
    return [];
  },

  // Categorias de despesas (podem vir da API ou ser estáticas)
  expenseCategories: [
    { value: 'SOFTWARE', label: 'Software e Licenças' },
    { value: 'INFRAESTRUTURA', label: 'Infraestrutura' },
    { value: 'SERVICOS', label: 'Serviços Terceirizados' },
    { value: 'EQUIPAMENTOS', label: 'Equipamentos' },
    { value: 'MARKETING', label: 'Marketing' },
    { value: 'OUTROS', label: 'Outros' }
  ]
};