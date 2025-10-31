/*
  helpContent copied from central-ajuda-crm/lib/help-content.ts
  Notes:
  - Image/assets (if needed) are stored under /public/faq-assets
  - No image paths were found in the original content; to reference an image in an article/question,
    include the path '/faq-assets/<filename.ext>' in the `answer` HTML/markdown.
*/

export const helpContent = {
  clientes: {
    title: "Clientes",
    articles: [
      {
        title: "Como cadastrar clientes",
        slug: "cadastrar-clientes",
        count: 3,
        questions: [
          {
            question: "Como acessar a tela de cadastro de clientes?",
            answer:
              'Para cadastrar um novo cliente, acesse o menu lateral e clique em "Clientes". Em seguida, clique no botão "Novo Cliente" localizado no canto superior direito da tela. Você será direcionado para o formulário de cadastro.',
          },
          {
            question: "Quais informações são obrigatórias no cadastro?",
            answer:
              "Os campos obrigatórios para cadastro de cliente são: Nome/Razão Social, CPF/CNPJ, E-mail e Telefone. Os demais campos como endereço, observações e dados complementares são opcionais, mas recomendamos preencher para ter um cadastro completo.",
          },
          {
            question: "Como validar o CPF/CNPJ do cliente?",
            answer:
              "O sistema valida automaticamente o CPF/CNPJ digitado. Se o número for inválido, uma mensagem de erro será exibida. Certifique-se de digitar apenas números, sem pontos, traços ou barras. O sistema formatará automaticamente.",
          },
        ],
      },
      {
        title: "Como atualizar dados de clientes",
        slug: "atualizar-clientes",
        count: 4,
        questions: [
          {
            question: "Como editar informações de um cliente existente?",
            answer:
              'Na listagem de clientes, localize o cliente desejado e clique no ícone de lápis ou no botão "Editar". Você pode usar a barra de busca para encontrar o cliente mais rapidamente. Após fazer as alterações necessárias, clique em "Salvar" para confirmar.',
          },
          {
            question: "É possível editar o CPF/CNPJ de um cliente?",
            answer:
              "Não é possível alterar o CPF/CNPJ de um cliente após o cadastro, pois este é um identificador único no sistema. Se houver necessidade de correção, recomendamos criar um novo cadastro com os dados corretos e inativar o cadastro anterior.",
          },
          {
            question: "Como atualizar múltiplos clientes de uma vez?",
            answer:
              "Atualmente o sistema não possui funcionalidade de edição em massa. Cada cliente deve ser editado individualmente para garantir a integridade dos dados.",
          },
          {
            question: "As alterações ficam registradas no histórico?",
            answer:
              "Sim, todas as alterações realizadas no cadastro do cliente ficam registradas no histórico de atividades, incluindo data, hora e usuário responsável pela modificação.",
          },
        ],
      },
      {
        title: "Como excluir clientes",
        slug: "excluir-clientes",
        count: 3,
        questions: [
          {
            question: "Como excluir um cliente do sistema?",
            answer:
              "Na listagem de clientes, localize o cliente que deseja excluir e clique no ícone de lixeira. Uma mensagem de confirmação será exibida. Atenção: esta ação não pode ser desfeita.",
          },
          {
            question: "Posso excluir um cliente vinculado a projetos?",
            answer:
              "Não é possível excluir clientes que possuem projetos, orçamentos ou movimentações financeiras vinculadas. Nestes casos, recomendamos inativar o cliente ao invés de excluí-lo, preservando o histórico de relacionamento.",
          },
          {
            question: "Como inativar um cliente ao invés de excluir?",
            answer:
              'Na tela de edição do cliente, localize o campo "Status" e altere para "Inativo". Clientes inativos não aparecem nas listagens principais, mas seus dados e histórico são preservados no sistema.',
          },
        ],
      },
      {
        title: "Como vincular cliente a um projeto",
        slug: "vincular-cliente-projeto",
        count: 2,
        questions: [
          {
            question: "Como associar um cliente a um novo projeto?",
            answer:
              'Ao criar um novo projeto, você encontrará o campo "Cliente" no formulário. Clique neste campo e selecione o cliente desejado na lista suspensa. Você também pode digitar o nome do cliente para filtrar a busca. O cliente deve estar cadastrado previamente no sistema.',
          },
          {
            question: "Posso alterar o cliente de um projeto existente?",
            answer:
              "Sim, é possível alterar o cliente vinculado a um projeto. Acesse a tela de edição do projeto e selecione um novo cliente no campo correspondente. Atenção: esta alteração pode impactar relatórios e históricos financeiros relacionados ao projeto.",
          },
        ],
      },
    ],
  },
  orcamentos: {
    title: "Orçamentos",
    articles: [
      {
        title: "Como criar orçamentos",
        slug: "criar-orcamentos",
        count: 4,
        questions: [
          {
            question: "Como iniciar um novo orçamento?",
            answer:
              'Acesse o menu "Orçamentos" e clique no botão "Novo Orçamento". Selecione o cliente para quem o orçamento será criado. Se o cliente ainda não estiver cadastrado, você pode criá-lo diretamente nesta tela clicando em "Novo Cliente".',
          },
          {
            question: "Quais informações são necessárias no orçamento?",
            answer:
              "Um orçamento deve conter: Cliente, Data de validade, Lista de serviços/produtos com valores, Condições de pagamento e Observações (opcional). Todos estes campos ajudam a criar um orçamento completo e profissional.",
          },
          {
            question: "Como definir a validade do orçamento?",
            answer:
              'No formulário de criação, você encontrará o campo "Validade". Defina a data até quando o orçamento será válido. Por padrão, o sistema sugere 30 dias a partir da data de criação, mas você pode alterar conforme necessário.',
          },
          {
            question: "Posso duplicar um orçamento existente?",
            answer:
              "Sim, na listagem de orçamentos, clique no ícone de duplicar ao lado do orçamento desejado. Uma cópia será criada com todos os dados do orçamento original, permitindo que você faça ajustes antes de salvar.",
          },
        ],
      },
      {
        title: "Como inserir serviços no orçamento",
        slug: "inserir-servicos",
        count: 5,
        questions: [
          {
            question: "Como adicionar serviços ao orçamento?",
            answer:
              'Na tela de criação/edição do orçamento, localize a seção "Itens do Orçamento" e clique em "Adicionar Serviço". Preencha a descrição do serviço, quantidade, valor unitário e o sistema calculará automaticamente o valor total.',
          },
          {
            question: "Posso usar serviços pré-cadastrados?",
            answer:
              'Sim, o sistema possui um catálogo de serviços. Ao clicar em "Adicionar Serviço", você pode selecionar um serviço da lista ou criar um novo. Serviços frequentes podem ser salvos no catálogo para uso futuro.',
          },
          {
            question: "Como aplicar descontos nos serviços?",
            answer:
              "Cada item do orçamento possui um campo para desconto, que pode ser aplicado em percentual ou valor fixo. O desconto será calculado automaticamente e refletido no valor total do orçamento.",
          },
          {
            question: "Como reordenar os serviços no orçamento?",
            answer:
              "Você pode arrastar e soltar os itens para reordená-los. Clique e segure no ícone de arrastar (três linhas horizontais) ao lado de cada item e mova para a posição desejada.",
          },
          {
            question: "Como remover um serviço do orçamento?",
            answer:
              "Clique no ícone de lixeira ao lado do serviço que deseja remover. Uma confirmação será solicitada antes da exclusão. O valor total do orçamento será recalculado automaticamente.",
          },
        ],
      },
      {
        title: "Como acompanhar status do orçamento",
        slug: "acompanhar-status",
        count: 4,
        questions: [
          {
            question: "Quais são os status possíveis de um orçamento?",
            answer:
              "Os orçamentos podem ter os seguintes status: Rascunho (em elaboração), Enviado (aguardando resposta do cliente), Aprovado (aceito pelo cliente), Recusado (rejeitado pelo cliente) e Expirado (passou da data de validade).",
          },
          {
            question: "Como alterar o status de um orçamento?",
            answer:
              'Na listagem de orçamentos ou na tela de detalhes, você encontrará o campo "Status". Clique nele e selecione o novo status. Algumas transições de status podem exigir confirmação adicional.',
          },
          {
            question: "Como converter um orçamento aprovado em projeto?",
            answer:
              'Quando um orçamento é aprovado, um botão "Converter em Projeto" aparecerá na tela de detalhes. Clique nele e o sistema criará automaticamente um novo projeto com todas as informações do orçamento.',
          },
          {
            question: "Recebo notificações sobre mudanças de status?",
            answer:
              "Sim, o sistema envia notificações por e-mail sempre que há mudança de status em um orçamento. Você pode configurar quais notificações deseja receber nas configurações do seu perfil.",
          },
        ],
      },
    ],
  },
  projetos: {
    title: "Projetos",
    articles: [
      {
        title: "Como criar projetos",
        slug: "criar-projetos",
        count: 4,
        questions: [
          {
            question: "Como iniciar um novo projeto?",
            answer:
              'Acesse o menu "Projetos" e clique em "Novo Projeto". Preencha as informações básicas: nome do projeto, cliente, data de início e data prevista de término. Você também pode criar um projeto diretamente a partir de um orçamento aprovado.',
          },
          {
            question: "Quais informações são obrigatórias ao criar um projeto?",
            answer:
              "Os campos obrigatórios são: Nome do Projeto, Cliente e Data de Início. Os demais campos como descrição, orçamento, prazo e responsável são opcionais, mas recomendados para melhor gestão.",
          },
          {
            question: "Como definir o orçamento do projeto?",
            answer:
              'No formulário de criação, há um campo "Valor do Projeto" onde você pode inserir o valor total acordado. Este valor será usado como referência para acompanhamento financeiro e cálculo de margem.',
          },
          {
            question: "Posso criar projetos recorrentes?",
            answer:
              'Sim, ao criar um projeto, você pode marcá-lo como "Recorrente" e definir a periodicidade (mensal, trimestral, etc.). O sistema criará automaticamente novos projetos nas datas programadas.',
          },
        ],
      },
      {
        title: "Como criar e gerenciar tarefas",
        slug: "criar-tarefas",
        count: 6,
        questions: [
          {
            question: "Como adicionar tarefas a um projeto?",
            answer:
              'Na tela de detalhes do projeto, localize a seção "Tarefas" e clique em "Nova Tarefa". Preencha o título, descrição, prazo e responsável. As tarefas ajudam a organizar e acompanhar o progresso do projeto.',
          },
          {
            question: "Como definir prioridade das tarefas?",
            answer:
              'Cada tarefa possui um campo "Prioridade" que pode ser definido como Baixa, Média, Alta ou Urgente. Tarefas com maior prioridade aparecem destacadas na listagem e no dashboard.',
          },
          {
            question: "Como criar subtarefas?",
            answer:
              'Dentro de uma tarefa, você pode adicionar subtarefas clicando em "Adicionar Subtarefa". Isso permite quebrar tarefas complexas em etapas menores e mais gerenciáveis.',
          },
          {
            question: "Como marcar uma tarefa como concluída?",
            answer:
              'Clique na checkbox ao lado da tarefa ou abra os detalhes e altere o status para "Concluída". Tarefas concluídas são automaticamente movidas para a seção de histórico.',
          },
          {
            question: "Posso anexar arquivos às tarefas?",
            answer:
              'Sim, cada tarefa permite anexar múltiplos arquivos. Clique em "Anexar Arquivo" na tela de detalhes da tarefa e selecione os arquivos do seu computador. Formatos aceitos: PDF, DOC, XLS, imagens e ZIP.',
          },
          {
            question: "Como visualizar todas as minhas tarefas?",
            answer:
              'No menu principal, acesse "Minhas Tarefas" para ver uma lista consolidada de todas as tarefas atribuídas a você, independente do projeto. Você pode filtrar por status, prioridade e prazo.',
          },
        ],
      },
      {
        title: "Como definir responsáveis",
        slug: "definir-responsaveis",
        count: 3,
        questions: [
          {
            question: "Como atribuir um responsável ao projeto?",
            answer:
              'No formulário do projeto, há um campo "Responsável" onde você pode selecionar um usuário da equipe. O responsável terá permissões especiais de gestão sobre o projeto e receberá notificações importantes.',
          },
          {
            question: "Como atribuir responsáveis às tarefas?",
            answer:
              "Ao criar ou editar uma tarefa, selecione o responsável no campo correspondente. Você pode atribuir múltiplos responsáveis a uma mesma tarefa, se necessário. Todos receberão notificações sobre atualizações.",
          },
          {
            question: "Como alterar o responsável de uma tarefa?",
            answer:
              'Abra a tarefa, clique no campo "Responsável" e selecione um novo usuário. O responsável anterior e o novo receberão notificações sobre a mudança. O histórico da tarefa registrará esta alteração.',
          },
        ],
      },
      {
        title: "Como relacionar projetos a clientes",
        slug: "relacionar-clientes",
        count: 2,
        questions: [
          {
            question: "Como vincular um projeto a um cliente?",
            answer:
              'Todo projeto deve estar vinculado a um cliente. No formulário de criação, selecione o cliente no campo correspondente. Se o cliente não existir, você pode cadastrá-lo diretamente clicando em "Novo Cliente".',
          },
          {
            question: "Posso ver todos os projetos de um cliente?",
            answer:
              'Sim, na tela de detalhes do cliente, há uma aba "Projetos" que lista todos os projetos vinculados a ele, incluindo status, valores e prazos. Isso facilita o acompanhamento do relacionamento comercial.',
          },
        ],
      },
      {
        title: "Como acompanhar dados do projeto",
        slug: "acompanhar-dados",
        count: 4,
        questions: [
          {
            question: "Como visualizar o progresso do projeto?",
            answer:
              "Na tela de detalhes do projeto, você encontrará indicadores de progresso baseados nas tarefas concluídas, tempo decorrido e orçamento consumido. Gráficos visuais facilitam o acompanhamento.",
          },
          {
            question: "Como acompanhar o tempo gasto no projeto?",
            answer:
              'O sistema possui um timer integrado para registro de horas. Clique em "Registrar Tempo" na tarefa ou projeto e inicie o cronômetro. Você também pode adicionar registros de tempo manualmente.',
          },
          {
            question: "Como gerar relatórios do projeto?",
            answer:
              'Na tela do projeto, clique em "Relatórios" e selecione o tipo desejado: Resumo Executivo, Detalhamento de Tarefas, Análise Financeira ou Relatório de Horas. Os relatórios podem ser exportados em PDF ou Excel.',
          },
          {
            question: "Como acompanhar o orçamento do projeto?",
            answer:
              'A aba "Financeiro" do projeto mostra o orçamento total, valores já faturados, despesas registradas e saldo disponível. Alertas são exibidos quando o projeto se aproxima do limite orçamentário.',
          },
        ],
      },
    ],
  },
  financeiro: {
    title: "Financeiro",
    articles: [
      {
        title: "Como inserir movimentações financeiras",
        slug: "inserir-movimentacoes",
        count: 5,
        questions: [
          {
            question: "Como registrar uma receita?",
            answer:
              'Acesse o menu "Financeiro" e clique em "Nova Movimentação". Selecione o tipo "Receita", preencha o valor, data, categoria e descrição. Você pode vincular a receita a um projeto ou cliente específico.',
          },
          {
            question: "Como registrar uma despesa?",
            answer:
              'No menu "Financeiro", clique em "Nova Movimentação" e selecione "Despesa". Informe o valor, data de vencimento, fornecedor, categoria e forma de pagamento. Você pode anexar comprovantes e notas fiscais.',
          },
          {
            question: "Como categorizar movimentações?",
            answer:
              "Ao criar uma movimentação, selecione uma categoria no campo correspondente. As categorias ajudam a organizar e gerar relatórios financeiros mais precisos. Você pode criar novas categorias em Configurações > Categorias Financeiras.",
          },
          {
            question: "Como anexar comprovantes às movimentações?",
            answer:
              'Na tela de criação/edição da movimentação, clique em "Anexar Comprovante" e selecione o arquivo. Formatos aceitos: PDF, JPG, PNG. Você pode anexar múltiplos arquivos a uma mesma movimentação.',
          },
          {
            question: "Como registrar movimentações recorrentes?",
            answer:
              'Ao criar uma movimentação, marque a opção "Recorrente" e defina a periodicidade (mensal, trimestral, anual). O sistema criará automaticamente as próximas movimentações nas datas programadas.',
          },
        ],
      },
      {
        title: "Como conferir saldo",
        slug: "conferir-saldo",
        count: 3,
        questions: [
          {
            question: "Onde visualizar o saldo atual?",
            answer:
              'O saldo atual é exibido no dashboard principal e na página "Financeiro". Ele representa a diferença entre todas as receitas recebidas e despesas pagas até o momento. Você pode filtrar por período e conta bancária.',
          },
          {
            question: "Como ver o saldo por conta bancária?",
            answer:
              'Na página "Financeiro", use o filtro "Conta" para selecionar uma conta específica. O sistema mostrará o saldo individual de cada conta cadastrada, facilitando a conciliação bancária.',
          },
          {
            question: "Como visualizar projeção de saldo futuro?",
            answer:
              'O relatório "Fluxo de Caixa" mostra a projeção de saldo considerando receitas e despesas futuras já cadastradas. Acesse em Financeiro > Relatórios > Fluxo de Caixa e selecione o período desejado.',
          },
        ],
      },
      {
        title: "Como conferir saídas",
        slug: "conferir-saidas",
        count: 4,
        questions: [
          {
            question: "Como visualizar todas as despesas?",
            answer:
              "Acesse Financeiro > Despesas para ver a listagem completa. Você pode filtrar por período, categoria, fornecedor, status de pagamento e projeto. Use os filtros para análises mais específicas.",
          },
          {
            question: "Como identificar despesas pendentes?",
            answer:
              'Na listagem de despesas, use o filtro "Status: Pendente" para ver apenas as despesas que ainda não foram pagas. Despesas vencidas aparecem destacadas em vermelho para facilitar a identificação.',
          },
          {
            question: "Como gerar relatório de despesas por categoria?",
            answer:
              "Acesse Financeiro > Relatórios > Despesas por Categoria. Selecione o período desejado e o sistema gerará um gráfico e tabela mostrando a distribuição das despesas. Você pode exportar em PDF ou Excel.",
          },
          {
            question: "Como acompanhar despesas por projeto?",
            answer:
              'Na tela de detalhes do projeto, acesse a aba "Financeiro" para ver todas as despesas vinculadas. Isso permite acompanhar os custos reais versus o orçamento planejado do projeto.',
          },
        ],
      },
    ],
  },
  notas: {
    title: "Emissão de Notas Fiscais",
    articles: [
      {
        title: "O que é NFS-e e quem deve emitir",
        slug: "o-que-e-nfse",
        count: 4,
        questions: [
          {
            question: "O que é a Nota Fiscal de Serviços Eletrônica (NFS-e)?",
            answer:
              "A NFS-e é um documento digital gerado e armazenado eletronicamente para documentar operações de prestação de serviços. Ela substitui as antigas notas fiscais impressas e é obrigatória para empresas prestadoras de serviços que pagam Imposto Sobre Serviços (ISS).",
          },
          {
            question: "Qual a diferença entre NF-e e NFS-e?",
            answer:
              "A NF-e (Nota Fiscal Eletrônica) é utilizada para registrar a venda de produtos físicos, enquanto a NFS-e é específica para prestação de serviços. Cada uma possui campos e regras tributárias diferentes, adequadas ao tipo de operação.",
          },
          {
            question: "Quem é obrigado a emitir NFS-e?",
            answer:
              "Todas as empresas prestadoras de serviços, incluindo Microempreendedores Individuais (MEI) desde 01/09/2023, conforme a Resolução CGSN 169/2022. A obrigatoriedade varia conforme a legislação municipal, mas a maioria dos municípios já exige a emissão.",
          },
          {
            question: "MEI precisa emitir nota fiscal?",
            answer:
              "Sim, desde setembro de 2023, MEIs são obrigados a emitir NFS-e através dos emissores públicos nacionais (versão Web ou Mobile). A emissão é gratuita e pode ser feita pelo portal gov.br/nfse ou pelo aplicativo móvel.",
          },
        ],
      },
      {
        title: "Como emitir NFS-e pelo sistema",
        slug: "como-emitir-nfse",
        count: 6,
        questions: [
          {
            question: "Como acessar o módulo de emissão de notas?",
            answer:
              'No menu principal do CRM, clique em "Emissão de Notas". Você será direcionado para a tela de gerenciamento de notas fiscais, onde pode emitir novas notas, consultar emitidas e acompanhar o status.',
          },
          {
            question: "Quais informações são necessárias para emitir uma NFS-e?",
            answer:
              "Para emitir uma NFS-e você precisa: dados do tomador (cliente), descrição do serviço prestado, valor do serviço, alíquota de ISS, código de serviço municipal, data de competência e forma de pagamento. O sistema já possui alguns campos pré-preenchidos com base no cadastro do cliente e projeto.",
          },
          {
            question: "Como preencher o código de serviço?",
            answer:
              'O código de serviço segue a Lista de Serviços da LC 116/2003. No sistema, comece digitando a descrição do serviço e o sistema sugerirá os códigos correspondentes. Selecione o que melhor se adequa ao serviço prestado. Em caso de dúvida, consulte seu contador.',
          },
          {
            question: "Como definir a alíquota de ISS?",
            answer:
              "A alíquota de ISS varia de 2% a 5% conforme o município e tipo de serviço. O sistema sugere automaticamente a alíquota com base no código de serviço e município do tomador, mas você pode ajustar se necessário. Consulte a legislação municipal para confirmar.",
          },
          {
            question: "Posso emitir nota a partir de um projeto?",
            answer:
              'Sim, na tela de detalhes do projeto, clique em "Emitir Nota Fiscal". O sistema preencherá automaticamente os dados do cliente, descrição dos serviços e valores com base nas informações do projeto, agilizando o processo.',
          },
          {
            question: "Como enviar a nota para o cliente?",
            answer:
              "Após a emissão, a nota é automaticamente enviada por e-mail para o cliente cadastrado. Você também pode baixar o PDF da nota e enviar por outros meios. O link de consulta da nota também fica disponível para compartilhamento.",
          },
        ],
      },
      {
        title: "Gestão e consulta de notas emitidas",
        slug: "gestao-notas",
        count: 5,
        questions: [
          {
            question: "Como consultar notas fiscais emitidas?",
            answer:
              'Acesse o menu "Emissão de Notas" e você verá a listagem de todas as notas emitidas. Use os filtros para buscar por período, cliente, número da nota ou status. Clique em uma nota para ver os detalhes completos.',
          },
          {
            question: "Como baixar o PDF de uma nota emitida?",
            answer:
              'Na listagem de notas ou na tela de detalhes, clique no botão "Baixar PDF". O arquivo será gerado com o layout padrão da prefeitura e estará pronto para impressão ou envio ao cliente.',
          },
          {
            question: "Como consultar o status de uma nota?",
            answer:
              'Na listagem de notas, a coluna "Status" mostra a situação atual: Emitida, Cancelada, Processando ou Erro. Clique na nota para ver detalhes adicionais, incluindo data de emissão, número de verificação e protocolo.',
          },
          {
            question: "Como gerar relatório de notas emitidas?",
            answer:
              "Acesse Emissão de Notas > Relatórios. Selecione o período desejado e o tipo de relatório: Resumo Mensal, Detalhamento por Cliente ou Análise Tributária. Os relatórios podem ser exportados em PDF ou Excel para sua contabilidade.",
          },
          {
            question: "As notas ficam armazenadas por quanto tempo?",
            answer:
              "Todas as notas emitidas ficam armazenadas permanentemente no sistema, conforme exigência legal de guarda de documentos fiscais por no mínimo 5 anos. Você pode consultar notas antigas a qualquer momento através dos filtros de período.",
          },
        ],
      },
      {
        title: "Cancelamento e correção de notas",
        slug: "cancelamento-notas",
        count: 4,
        questions: [
          {
            question: "Como cancelar uma nota fiscal emitida?",
            answer:
              'Na tela de detalhes da nota, clique em "Cancelar Nota". Informe o motivo do cancelamento (campo obrigatório) e confirme. Atenção: o cancelamento é irreversível e deve ser feito dentro do prazo permitido pela legislação municipal, geralmente até o dia 10 do mês seguinte.',
          },
          {
            question: "Existe prazo para cancelar uma nota?",
            answer:
              "Sim, a maioria dos municípios permite cancelamento apenas até o dia 10 do mês seguinte à emissão. Após este prazo, o cancelamento pode não ser permitido pelo sistema da prefeitura. Consulte a legislação do seu município para confirmar o prazo específico.",
          },
          {
            question: "O que fazer se emiti uma nota com erro?",
            answer:
              "Se o erro for identificado dentro do prazo de cancelamento, cancele a nota e emita uma nova com os dados corretos. Se o prazo já passou, você precisará emitir uma nota de ajuste ou carta de correção, conforme orientação do seu contador.",
          },
          {
            question: "Como emitir nota de substituição?",
            answer:
              'Não existe "nota de substituição" na NFS-e. Se precisar corrigir uma nota, você deve cancelá-la (dentro do prazo) e emitir uma nova nota com os dados corretos. A nota cancelada permanecerá no histórico com status "Cancelada".',
          },
        ],
      },
      {
        title: "Configurações e integrações fiscais",
        slug: "configuracoes-fiscais",
        count: 5,
        questions: [
          {
            question: "Como configurar os dados fiscais da empresa?",
            answer:
              "Acesse Configurações > Dados Fiscais. Preencha: CNPJ/CPF, Inscrição Municipal, Regime Tributário, Alíquota padrão de ISS e Certificado Digital (se aplicável). Estas informações são essenciais para a emissão correta das notas.",
          },
          {
            question: "Preciso de certificado digital para emitir NFS-e?",
            answer:
              "Depende do município e do tipo de empresa. MEIs geralmente não precisam de certificado digital. Empresas de outros portes podem precisar, conforme exigência da prefeitura. Consulte a legislação do seu município ou seu contador.",
          },
          {
            question: "Como integrar com o sistema da prefeitura?",
            answer:
              "O sistema já possui integração com as principais prefeituras brasileiras. Em Configurações > Integrações Fiscais, selecione seu município e informe as credenciais de acesso ao portal da prefeitura. O sistema testará a conexão automaticamente.",
          },
          {
            question: "O que é RPS (Recibo Provisório de Serviços)?",
            answer:
              "O RPS é um documento temporário que pode ser usado quando o sistema de emissão de NFS-e estiver indisponível. Posteriormente, o RPS deve ser convertido em NFS-e. Nosso sistema permite emitir RPS e fazer a conversão automática quando o sistema voltar.",
          },
          {
            question: "Como exportar dados para a contabilidade?",
            answer:
              "Acesse Emissão de Notas > Exportar para Contabilidade. Selecione o período e o formato desejado (XML, CSV ou Excel). O arquivo conterá todas as notas emitidas com os dados fiscais necessários para escrituração contábil.",
          },
        ],
      },
      {
        title: "Dúvidas frequentes e resolução de problemas",
        slug: "duvidas-frequentes",
        count: 6,
        questions: [
          {
            question: "Existe limite de valor para emissão de NFS-e?",
            answer:
              "Não há limite de valor por nota, mas MEIs devem respeitar o limite de faturamento anual de R$ 81.000,00 (ou R$ 251.600,00 para MEI Caminhoneiro). Empresas de outros portes devem observar os limites do seu regime tributário.",
          },
          {
            question: "Preciso informar o tomador em todas as notas?",
            answer:
              "Para a maioria das empresas, sim. Apenas MEIs usando o módulo simplificado ou aplicativo mobile podem emitir notas sem informar o tomador. Para empresas de outros portes, os dados do tomador são obrigatórios.",
          },
          {
            question: 'O que fazer quando a nota fica com status "Erro"?',
            answer:
              "Clique na nota para ver os detalhes do erro. Os erros mais comuns são: dados cadastrais incorretos, código de serviço inválido ou problemas na conexão com a prefeitura. Corrija as informações e tente reenviar. Se o erro persistir, entre em contato com o suporte.",
          },
          {
            question: "Como emitir nota para cliente de outro município?",
            answer:
              "O processo é o mesmo, mas atenção: o ISS pode ser devido no município do tomador (onde o serviço foi prestado) ou do prestador, conforme o tipo de serviço. O sistema alertará sobre a tributação correta com base no código de serviço.",
          },
          {
            question: "Posso emitir nota retroativa?",
            answer:
              "Depende da legislação municipal. Alguns municípios permitem emissão retroativa dentro do mesmo mês, outros não. O sistema bloqueará automaticamente se a data não for permitida pela prefeitura. Em caso de necessidade, consulte seu contador.",
          },
          {
            question: "Como funciona a retenção de impostos na NFS-e?",
            answer:
              "Alguns serviços estão sujeitos à retenção de impostos (IRRF, PIS, COFINS, CSLL, INSS). O sistema calcula automaticamente as retenções com base no código de serviço e regime tributário. Os valores retidos são destacados na nota e deduzidos do valor líquido.",
          },
        ],
      },
    ],
  },
};

export default helpContent;
