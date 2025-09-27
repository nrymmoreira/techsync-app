// Dados fictícios para o módulo financeiro
export const financialData = {
  // Receitas dos projetos
  projectRevenues: [
    {
      id: 1,
      projectId: 1,
      projectName: "Sistema de E-commerce TechStore",
      clientName: "TechStore Ltda",
      valor: 45000,
      statusPagamento: "PAGO",
      dataPagamento: "2024-12-15",
      dataVencimento: "2024-12-10",
      tipo: "RECEITA"
    },
    {
      id: 2,
      projectId: 2,
      projectName: "App Mobile InnovaTech",
      clientName: "InnovaTech Solutions",
      valor: 28000,
      statusPagamento: "PENDENTE",
      dataPagamento: null,
      dataVencimento: "2025-01-15",
      tipo: "RECEITA"
    },
    {
      id: 3,
      projectId: 3,
      projectName: "Website Corporativo",
      clientName: "Empresa ABC",
      valor: 15000,
      statusPagamento: "PAGO",
      dataPagamento: "2024-11-20",
      dataVencimento: "2024-11-15",
      tipo: "RECEITA"
    }
  ],

  // Despesas operacionais
  expenses: [
    {
      id: 1,
      descricao: "Licença Adobe Creative Suite",
      valor: 250,
      categoria: "SOFTWARE",
      dataVencimento: "2025-01-05",
      dataPagamento: "2025-01-05",
      statusPagamento: "PAGO",
      tipo: "DESPESA",
      recorrente: true
    },
    {
      id: 2,
      descricao: "Hospedagem AWS",
      valor: 180,
      categoria: "INFRAESTRUTURA",
      dataVencimento: "2025-01-10",
      dataPagamento: null,
      statusPagamento: "PENDENTE",
      tipo: "DESPESA",
      recorrente: true
    },
    {
      id: 3,
      descricao: "Freelancer - Design UI/UX",
      valor: 3500,
      categoria: "SERVICOS",
      dataVencimento: "2024-12-20",
      dataPagamento: "2024-12-18",
      statusPagamento: "PAGO",
      tipo: "DESPESA",
      recorrente: false
    },
    {
      id: 4,
      descricao: "Licença JetBrains",
      valor: 150,
      categoria: "SOFTWARE",
      dataVencimento: "2025-01-15",
      dataPagamento: null,
      statusPagamento: "PENDENTE",
      tipo: "DESPESA",
      recorrente: true
    }
  ],

  // Categorias de despesas
  expenseCategories: [
    { value: 'SOFTWARE', label: 'Software e Licenças' },
    { value: 'INFRAESTRUTURA', label: 'Infraestrutura' },
    { value: 'SERVICOS', label: 'Serviços Terceirizados' },
    { value: 'EQUIPAMENTOS', label: 'Equipamentos' },
    { value: 'MARKETING', label: 'Marketing' },
    { value: 'OUTROS', label: 'Outros' }
  ],

  // Métricas calculadas
  getMetrics: function() {
    const totalReceitas = this.projectRevenues.reduce((sum, item) => sum + item.valor, 0);
    const receitasPagas = this.projectRevenues
      .filter(item => item.statusPagamento === 'PAGO')
      .reduce((sum, item) => sum + item.valor, 0);
    const receitasPendentes = this.projectRevenues
      .filter(item => item.statusPagamento === 'PENDENTE')
      .reduce((sum, item) => sum + item.valor, 0);

    const totalDespesas = this.expenses.reduce((sum, item) => sum + item.valor, 0);
    const despesasPagas = this.expenses
      .filter(item => item.statusPagamento === 'PAGO')
      .reduce((sum, item) => sum + item.valor, 0);
    const despesasPendentes = this.expenses
      .filter(item => item.statusPagamento === 'PENDENTE')
      .reduce((sum, item) => sum + item.valor, 0);

    const lucroLiquido = receitasPagas - despesasPagas;
    const margemLucro = totalReceitas > 0 ? (lucroLiquido / totalReceitas) * 100 : 0;

    return {
      totalReceitas,
      receitasPagas,
      receitasPendentes,
      totalDespesas,
      despesasPagas,
      despesasPendentes,
      lucroLiquido,
      margemLucro,
      saldoDisponivel: receitasPagas - despesasPagas
    };
  },

  // Dados para gráficos
  getChartData: function() {
    const metrics = this.getMetrics();
    
    // Gráfico de pizza - Receitas vs Despesas
    const revenueExpenseData = [
      { name: 'Receitas Pagas', value: metrics.receitasPagas },
      { name: 'Despesas Pagas', value: metrics.despesasPagas }
    ];

    // Gráfico de barras - Receitas por projeto
    const projectRevenueData = this.projectRevenues.map(project => ({
      name: project.projectName.substring(0, 20) + '...',
      value: project.valor,
      status: project.statusPagamento
    }));

    // Gráfico de despesas por categoria
    const expensesByCategory = this.expenseCategories.map(category => {
      const categoryExpenses = this.expenses
        .filter(expense => expense.categoria === category.value)
        .reduce((sum, expense) => sum + expense.valor, 0);
      
      return {
        name: category.label,
        value: categoryExpenses
      };
    }).filter(item => item.value > 0);

    // Fluxo de caixa mensal (dados simulados)
    const cashFlowData = [
      { name: 'Out', receitas: 35000, despesas: 8500, lucro: 26500 },
      { name: 'Nov', receitas: 42000, despesas: 9200, lucro: 32800 },
      { name: 'Dez', receitas: 45000, despesas: 10100, lucro: 34900 },
      { name: 'Jan', receitas: 28000, despesas: 8800, lucro: 19200 }
    ];

    return {
      revenueExpenseData,
      projectRevenueData,
      expensesByCategory,
      cashFlowData
    };
  }
};