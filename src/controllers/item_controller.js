const { Item } = require('../model/schemas');

const create = async (request, response) => {
    try {
        
        const item = await Item.create(request.body);
        return response.status(201).json(item);

    } catch (error) {

        console.log(error);
        return response.status(400).send({ message: "Erro ao criar o item" });

    }

};

const getOne = async (request, response) => {
    try {

        const item = await Item.findByPk(request.params.id);
        if (!item) {
            return response.status(404).send({ message: "Item não encontrado" });
        }

        return response.status(200).json(item);

    } catch (error) {

        console.log(error);
        return response.status(400).send({ message: "Erro ao buscar o item" });

    }
};

const getAll_by_restaurant = async (request, response) => {
    try {

        const items = await Item.findAll({
            where: {RestaurantId: request.params.id}
        });

        return response.status(200).json(items);

    } catch (error) {

        console.log(error);
        return response.status(400).send({ message: "Erro ao buscar os itens" });

    }
};

const update = async (request, response) => {
    try {

        const [updated] = await Item.update(request.body, {
            where: { id: request.body.id },
        });
        if (updated) {
            return response.status(200).send({ message: "Item atualizado com sucesso" });
        }

        return response.status(404).send({ message: "Item não encontrado" });

    } catch (error) {

        console.log(error);
        return response.status(400).send({ message: "Erro ao atualizar o item" });

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
            return response.status(200).send({ message: "Item deletado com sucesso" });
        }

        return response.status(404).send({ message: "Item não encontrado" });

    } catch (error) {

        console.log(error);
        return response.status(400).send({ message: "Erro ao deletar o item" });

    }
};

module.exports = {
    create,
    getOne,
    getAll_by_restaurant,
    update,
    destroy
};