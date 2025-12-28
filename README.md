# Frota Pro - Sistema de Gestão de Frotas

Sistema web para gestão completa de frotas de veículos, incluindo cadastro de veículos, ordens de serviço de manutenção, controle de usuários e painel de controle com estatísticas e gráficos.

## Funcionalidades

- **Autenticação de Usuários**: Login seguro com armazenamento de sessão no navegador.
- **Dashboard**: Visão geral com estatísticas de frota, manutenções em aberto e concluídas, além de gráfico de produtividade mensal.
- **Gestão de Veículos**: Cadastro, listagem e visualização de veículos com placa, modelo e quilometragem atual.
- **Ordens de Serviço**: Abertura e finalização de manutenções, associadas a veículos específicos.
- **Gestão de Usuários**: Cadastro de usuários com perfis (Mecânico ou Gestor) e controle de acesso.
- **Interface Responsiva**: Design moderno utilizando Tailwind CSS, com sidebar de navegação e layouts consistentes.

## Tecnologias Utilizadas

- **Frontend**: React 19, React Router DOM, Axios para requisições HTTP.
- **Estilização**: Tailwind CSS 4, com variáveis customizadas para temas.
- **Gráficos**: Recharts para visualização de dados no dashboard.
- **Ícones**: Lucide React para ícones consistentes.
- **Build Tool**: Vite para desenvolvimento rápido e build otimizado.
- **Linting**: ESLint com regras para React e hooks.
- **Backend**: Integração com API REST (baseada em Java Spring Boot, assumindo endpoint em `http://localhost:8080/api`).

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Backend rodando na porta 8080 (não incluído neste repositório)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/frota-web.git
   cd frota-web
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse a aplicação em `http://localhost:5173` (porta padrão do Vite).

## Como Usar

1. **Login**: Use credenciais válidas para acessar o sistema (redireciona para `/veiculos` após login).
2. **Dashboard**: Visualize estatísticas e gráficos em `/dashboard`.
3. **Veículos**: Cadastre e liste veículos em `/veiculos`.
4. **Manutenções**: Abra e finalize ordens de serviço em `/manutencoes`.
5. **Usuários**: Gerencie usuários em `/usuarios` (acesso restrito por perfil).

## Estrutura do Projeto

```
src/
├── api/
│   └── api.js              # Configuração do Axios para API
├── components/
│   ├── Button.jsx          # Componente de botão reutilizável
│   ├── FormVeiculo.jsx     # Formulário para cadastro de veículos
│   ├── Layout.jsx          # Layout principal com sidebar
│   └── Sidebar.jsx         # Navegação lateral
├── pages/
│   ├── Dashboard.jsx       # Página do painel de controle
│   ├── Login.jsx           # Página de autenticação
│   ├── Manutencoes.jsx     # Gestão de ordens de serviço
│   ├── Usuarios.jsx        # Gestão de usuários
│   └── Veiculos.jsx        # Listagem de veículos (não utilizada na rota principal)
├── App.jsx                 # Componente principal da aplicação
├── App.css                 # Estilos adicionais (importa Tailwind)
├── index.css               # Estilos globais com variáveis CSS
└── main.jsx                # Ponto de entrada com roteamento
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera build de produção.
- `npm run lint`: Executa linting com ESLint.
- `npm run preview`: Visualiza o build de produção localmente.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`).
4. Push para a branch (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

## Licença

Este projeto é licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.

## Contato

Para dúvidas ou sugestões, entre em contato via eng.linekerx@gmail.com.

