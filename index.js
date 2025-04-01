const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const cadastros = require("./database/cadastros");  // Modelo de Cadastro

const app = express();

// Conexão com o banco de dados
connection.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados foi feita com sucesso!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

// Configurações do Express
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para exibir todos os cadastros (produtos)
app.get("/", (req, res) => {
    cadastros.findAll({ raw: true, order: [["id", 'DESC']] })
        .then(cadastros => {
            res.render("index", { cadastros: cadastros });
        })
        .catch(err => {
            console.log(err);
            res.send("Erro ao carregar os cadastros.");
        });
});

// Rota para exibir o formulário de cadastro de produtos
app.get("/cadastrar", (req, res) => {
    res.render("cadastro"); 
});

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

// Rota para exibir os detalhes de um cadastro (produto)
app.get("/cadastro/:id", (req, res) => {
    const id = req.params.id;

    cadastros.findOne({
        where: { id: id }
    })
    .then(cadastro => {
        if (cadastro) {
            res.render("cadastro", { cadastro: cadastro });
        } else {
            res.redirect("/");  // Caso o produto não seja encontrado, redireciona para a página inicial
        }
    })
    .catch(err => {
        console.log(err);
        res.redirect("/");
    });
});

// Iniciando o servidor
app.listen(5000, () => {
    console.log("App rodando na porta 5000");
});
