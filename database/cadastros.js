const Sequelize = require('sequelize');
const connection = require('./database'); // Conexão com o banco de dados

const Produto = connection.define('produtos', {
    id: {
        type: Sequelize.UUID, // Usando UUID para o ID (gerando um ID aleatório)
        primaryKey: true,      // Definindo como chave primária
        defaultValue: Sequelize.UUIDV4, // Gera UUID automaticamente
        allowNull: false // Não permite nulo
    },
    nome: {
        type: Sequelize.STRING, // Tipo para armazenar o nome do produto
        allowNull: false        // Não permite nulo
    },
    descricao: {
        type: Sequelize.TEXT,  // Tipo para armazenar uma descrição longa
        allowNull: true        // Permite nulo (pode ser opcional)
    },
    preco: {
        type: Sequelize.DECIMAL(10, 2), // Usando DECIMAL para representar valores monetários
        allowNull: false        // Não permite nulo
    },
    imagem: {
        type: Sequelize.STRING, // Tipo string para armazenar o caminho ou URL da imagem
        allowNull: false        // Não permite nulo
    }
}, {
    timestamps: true, // Gera automaticamente as colunas `createdAt` e `updatedAt`
    tableName: 'produtos' // Nome da tabela no banco de dados
});

// Sincronizar o modelo com o banco de dados
Produto.sync()
    .then(() => {
        console.log('Tabela "produtos" criada com sucesso!');
    })
    .catch((error) => {
        console.error('Erro ao criar a tabela de produtos:', error);
    });

module.exports = Produto;
