## Sobre o sistema

ART Estoque é um sistema de gerenciamento de caixa / estoque para grupos de artesãos (ou lojistas em geral). Com ele é possível:

- Cadastrar, editar e remover produtos.
- Cadastrar, editar e remover compras dos produtos, adicionando os valores comprados ao estoque.
- Cadastrar, editar e remover vendas dos produtos, subtraindo os valores compras do estoque.
- Ver o relatório de compras por intervalo de datas.
- Ver o relatório de vendas por intervalo de datas.
- Ver o relatório de faturamento (vendas - compras) por intervalo de datas.

## Utilização do sistema

Para utilizar o sistema é necessário primeiramente se cadastrar. Todos os produtos, vendas e etc. são ligados somente à conta de usuário logada no momento.

## Requisitos de instalação

- PHP 8.0 ou superior.
- Composer versão 2.5 ou superior.
- NodeJS versão 20.5 ou superior.
- NPM versão 9.8 ou superior.
- Banco de dados relacional.
- Configuração de envio de emails.

## Instalação do sistema

Após clonagem a do projeto, siga os seguintes passos em ordem:
- Alterar o nome do arquivo .env.example para .env
- Configurar o banco de dados no arquivo .env
- Configurar o envio de emails no arquivo .env
- Alterar as urls referentes ao sistema no arquivo .env
- Rodar os seguintes comandos em ordem: 
- composer install (instala as dependências do composer)
- npm install (instala as dependências do node)
- php artisan storage:link (cria um link da pasta storage com a public)
- php artisan migrate (cria as tabelas no banco de dados)
- npm run build (builda o front-end do projeto)

O sistema estará disponível após toda a sequencia ser executada.
