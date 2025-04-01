Relatório sobre a Aplicação de Cadastro de Produtos com Comentários
Introdução
O projeto desenvolvido tem como objetivo criar uma aplicação web para o cadastro de produtos, onde os usuários podem adicionar novos produtos com informações como nome, descrição, preço e imagem. Além disso, a aplicação permite visualizar os detalhes dos produtos e permite que os usuários façam comentários sobre os mesmos.
A solução foi construída utilizando o framework Express.js com Sequelize para realizar a comunicação com o banco de dados MySQL. A interface do usuário foi desenvolvida com EJS como motor de templates e Bootstrap para o layout e estilização das páginas.
Tecnologias Utilizadas
1.	Express.js: Framework para Node.js que facilita a construção de aplicações web.
2.	Sequelize: ORM (Object-Relational Mapping) que permite realizar operações de banco de dados de maneira mais simples e abstrata.
3.	MySQL: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar os dados dos produtos.
4.	EJS: Motor de templates utilizado para gerar páginas HTML dinâmicas.
5.	Bootstrap: Framework CSS utilizado para facilitar o design responsivo da aplicação.
Funcionalidades do Sistema
O sistema possui várias funcionalidades essenciais para o cadastro de produtos e interação dos usuários com os produtos cadastrados.
1.	Cadastro de Produtos: A aplicação permite cadastrar novos produtos com informações como:
o	Nome
o	Descrição
o	Preço
o	Imagem (URL da imagem do produto)
O formulário de cadastro é simples e direto, com campos obrigatórios para o nome, preço e imagem.
2.	Exibição de Produtos: Na página principal da aplicação, todos os produtos cadastrados são listados. Cada produto é exibido com seu nome, descrição, preço e imagem.
3.	Detalhamento de Produto: Cada produto tem uma página de detalhes onde é possível visualizar informações completas do produto, como a descrição, preço e imagem.
4.	Banco de Dados: A aplicação utiliza um banco de dados MySQL, onde são armazenadas as informações dos produtos e dos comentários. A tabela produtos armazena os dados principais, enquanto os comentários são armazenados em uma tabela separada e relacionados aos produtos.
Estrutura do Banco de Dados
O banco de dados é composto por duas tabelas principais:
1.	Tabela produtos:
o	id: Identificador único (UUID) do produto.
o	nome: Nome do produto.
o	descricao: Descrição do produto.
o	preco: Preço do produto.
o	imagem: Caminho ou URL da imagem do produto.
Estrutura do Código
O código da aplicação é dividido em vários arquivos, cada um com uma função específica:
•	index.js: O arquivo principal que contém as rotas da aplicação. Ele define como a aplicação irá reagir a diferentes requisições HTTP, como exibir a lista de produtos, mostrar os detalhes de um produto e salvar novos cadastros.
•	database.js: Arquivo de configuração do banco de dados que estabelece a conexão com o MySQL utilizando o Sequelize.
•	cadastros.js: Modelo de dados para a tabela produtos, que define os campos e as regras para os dados inseridos na tabela de produtos.
•	EJS Files: Arquivos de interface com o usuário. O header.ejs define o cabeçalho comum a todas as páginas, o navbar.ejs define a navegação da página e o footer.ejs contém o rodapé. O arquivo cadastro.ejs exibe o formulário de cadastro de produtos, enquanto index.ejs exibe a lista de produtos.
Exemplo de Funcionalidade do Código

Abaixo, destacamos o código que realiza o cadastro de produtos e o salvamento no banco de dados:

javascript
Copiar
app.post("/salvarcadastro", (req, res) => {
    const { nome, descricao, preco, imagem } = req.body;

    // Verificação se os campos obrigatórios foram preenchidos
    if (!nome || !preco || !imagem) {
        return res.send("Todos os campos obrigatórios precisam ser preenchidos!");
    }

    cadastros.create({
        nome: nome,
        descricao: descricao,
        preco: preco,
        imagem: imagem
    })
    .then(() => {
        res.redirect("/");  // Redireciona para a página inicial após salvar
    })
    .catch(err => {
        console.log(err);
        res.send("Erro ao cadastrar o produto.");
    });
});



Este trecho de código mostra como a aplicação recebe as informações do produto através de um formulário, valida se os campos obrigatórios estão preenchidos e, em seguida, salva os dados no banco de dados.
Conclusão
A aplicação construída oferece uma solução simples e eficiente para o cadastro de produto. Utilizando tecnologias modernas como Express.js, Sequelize e MySQL, a aplicação é escalável e pode ser facilmente expandida com mais funcionalidades no futuro.
A solução é bem estruturada, com um design responsivo baseado no Bootstrap, e a utilização do EJS para renderizar dinamicamente as páginas HTML proporciona uma boa experiência ao usuário.
________________________________________

