const mongoose = require("mongoose")

const db_password = process.env.DB_PASS

const connect = () => {
    const uri = `mongodb+srv://CGF:${db_password}@cluster0.rmezi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    mongoose.connect(uri)
        .then(() => {
            console.log("Conectado com sucesso");
        })
        .catch((error) => {
            console.log("Erro ao se conectar com o banco", error);
        });
}

connect()

module.exports = mongoose;