Sistema de Gestão de Usuários
 
Visão Geral
 
O Sistema de Gestão de Usuários é uma solução integrada para o gerenciamento de dados de usuários, projetado para fornecer uma interface intuitiva e robusta tanto para administradores quanto para usuários finais. O projeto é estruturado em duas principais camadas: um frontend desenvolvido com React.js e um backend construído com Node.js, utilizando SQL Server como banco de dados.

Arquitetura do Projeto
 
Frontend
 
O frontend é desenvolvido em React.js, com a seguinte estrutura:

Framework: React.js
Bibliotecas de UI: Ant Design ou Material-UI
Comunicação HTTP: Axios
Visualização de Dados: Recharts
Manipulação de Excel: ExcelJS

Estrutura de Diretórios:

src/components/: Componentes reutilizáveis da interface de usuário.
src/pages/: Páginas da aplicação, incluindo InserirUsuarioPage.js e AlterarUsuarioPage.js.
src/services/: Serviços que gerenciam a comunicação com o backend, como usuarioService.js.
 
Backend
 
O backend é implementado em Node.js, utilizando Express para a criação das APIs e SQL Server para armazenamento de dados:

Framework: Express.js
Banco de Dados: SQL Server
 
Estrutura de Diretórios:

routes/usuarios.js: Configuração das rotas para operações CRUD de usuários.
controllers/: Lógica de controle para manipulação de dados de usuários.
models/: Definições de modelos de dados e interações com o banco de dados.
 
Funcionalidades Principais
 
Inserção de Usuário: Adiciona novos registros de usuários ao banco de dados.
Alteração de Usuário: Permite a modificação de dados de usuários existentes.
Exclusão de Usuário: Remove usuários do banco de dados.
Localização de Usuário: Busca usuários por nome completo ou ID.
Gerenciamento de Colunas: Permite a adição e alteração de colunas no banco de dados.
 
Guia de Instalação e Execução
 
Frontend
 
Clone o Repositório:

gh repo clone Enos-AL/Sistema
Navegue para o Diretório do Frontend:

cd seu-repositorio/frontend

Instale as Dependências:

npm install

Inicie o Servidor de Desenvolvimento:

npm start
 
Backend
 
Navegue para o Diretório do Backend:

cd seu-repositorio/backend

Instale as Dependências:

npm install

Configure o Banco de Dados e Variáveis de Ambiente: Configure as variáveis de ambiente necessárias e o acesso ao banco de dados.
Inicie o Servidor:

npm start

Diretrizes de Contribuição
 
Contribuições são bem-vindas. Para contribuir com o projeto, por favor, siga as diretrizes abaixo:

Abra Issues para relatar bugs ou solicitar novas funcionalidades.
Envie Pull Requests para implementar melhorias ou correções.

Por favor, consulte o Guia de Contribuição e o Código de Conduta para mais detalhes.
 
Licença

Este projeto está licenciado sob a Licença MIT.
 
Contato

Para questões ou mais informações, entre em contato com:

Nome: Enos Alves Santos
Email: ciscopackettracent@gmail.com
LinkedIn: https://lnkd.in/dFM8-W88
GitHub: https://lnkd.in/dhiHHUsF 

