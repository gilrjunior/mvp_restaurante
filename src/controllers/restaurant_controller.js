const { Restaurant } = require('../model/schemas');
const { Item } = require('../model/schemas');

const create = async (request, response) => {
    try {
        
        const restaurant = await Restaurant.create(request.body);
        return response.status(201).json(restaurant);

    } catch (error) {

        console.log(error);
        return response.status(400).send({ message: "Erro ao criar o restaurante" });

    }
};

const getOne = async (request, response) => {
    try {

        const restaurant = await Restaurant.findByPk(request.params.id);

        if (!restaurant) {
            return response.status(404).send({ message: "Restaurante não encontrado" });
        }

        return response.status(201).json(restaurant);

    } catch (error) {

        console.log(error);
        return response.status(400).send({ message: "Erro ao buscar o restaurante" });

    }
};

const getAll = async (request, response) => {
    try {

        const restaurants = await Restaurant.findAll();
        return response.status(200).json(restaurants);

    } catch (error) {

        console.log(error);
        return response.status(400).send({ message: "Erro ao buscar os restaurantes" });

    }
};

const update = async (request, response) => {
    try {

        const [updated] = await Restaurant.update(request.body, {
            where: { id: request.body.id },
        });

        if (updated) {
            return response.status(200).send({ message: "Restaurante atualizado com sucesso" });
        }

        return response.status(404).send({ message: "Restaurante não encontrado" });

    } catch (error) {

        console.log(error);
        return response.status(400).send({ message: "Erro ao atualizar o restaurante" });
    }
};

const destroy = async (request, response) => {
    try {

        const items = await Item.findAll({
            where: {RestaurantId: request.params.id}
        });

        if(items){
            await Item.destroy({
                where: {
                    RestaurantId: request.params.id,
                },
            });
        }
        
        const deleted = await Restaurant.destroy({
            where: {
                id: request.params.id,
            },
        });

        if (deleted) {
            return response.status(200).send({ message: "Restaurante deletado com sucesso" });
        }

        return response.status(404).send({ message: "Restaurante não encontrado" });

    } catch (error) {

        console.log(error);
        return response.status(400).send({ message: "Erro ao deletar o restaurante" });
    }
};

module.exports = {
    create,
    getOne,
    getAll,
    update,
    destroy
};
