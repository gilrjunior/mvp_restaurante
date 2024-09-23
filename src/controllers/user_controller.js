const { User } = require('../model/schemas');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const create = async (request, response) => {
    try {
        
        var user = await User.findOne({
            where: {email: request.body.email}
        });

        if(user){
            return response.status(404).send({ message: "O usuário já existe" });
        }

        var salt = await bcrypt.genSalt(12)
        var password = await bcrypt.hash(request.body.password, salt)
        
        user = await User.create({email: request.body.email, password: password})

        return response.status(201).send({message: "Usuário criado com sucesso!"});
    
    } catch (error) {

        return response.status(500).send({ message: "Erro ao criar o usuário" }); // Retorna um status de erro
    }

};

const getOne = async (request, response) => {
    try {

        const user = await User.findByPk(request.params.id);
        if (!item) {

            return response.status(404).send({ message: "Usuário não encontrado" });

        }

        return response.status(200).json(user);

    } catch (error) {

        console.log(error);

        return response.status(400).send({ message: "Erro ao buscar o usuário" });
    }
};

const getAll = async (request, response) => {
    try {

        const users = await User.findAll();

        if (!users) {
            return response.status(404).send({ message: "Usuário não encontrado" });
        }

        return response.status(200).json(users);

    } catch (error) {

        console.log(error);

        return response.status(400).send({ message: "Erro ao buscar o usuário" });
    }
};

const update = async (request, response) => {
    try {

        const [updated] = await User.update(request.body, {
            where: { id: request.body.id },
        });

        if (updated) {
            return response.status(200).send({ message: "Usuário atualizado com sucesso" });
        }

        return response.status(404).send({ message: "Usuário não encontrado" });

    } catch (error) {

        console.log(error);

        return response.status(400).send({ message: "Erro ao atualizar o usuário" });
    }
};

const destroy = async (request, response) => {
    try {

        const deleted = await Item.destroy({
            where: {
                id: request.params.id,
            },
        });

        if (deleted) {

            return response.status(200).send({ message: "Usuário deletado com sucesso" });
        }

        return response.status(404).send({ message: "Usuário não encontrado" });

    } catch (error) {

        console.log(error);
        
        return response.status(400).send({ message: "Erro ao deletar o usuário" });
    }
};

const login =  async (request, response) => {
    try {
        var user = await User.findOne({
            where: {email: request.body.email}
        });
        if(!user){
            return response.status(404).send({ message: "O usuário não existe" });
        }
        var check_password = await bcrypt.compare(request.body.password, user.password)
        if(!check_password){
            return response.status(422).send({message: "Senha Inválida!"});
        }

        const token = jwt.sign({
            id: user.id
        },
            process.env.SECRET        
        )

        return response.status(200).send({message: "Usuário autenticado!", token: token});

    } catch (error) {

        console.log(error)

        return response.status(500).send({ message: "Erro ao fazer login" }); // Retorna um status de erro
    }
}

module.exports = {
    create,
    getOne,
    getAll,
    update,
    destroy,
    login
};