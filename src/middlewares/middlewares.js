const jwt = require("jsonwebtoken");

const validateId = (request, response, next) => {

    const { id } = request.body;

    if(id == undefined || id == null){
        return response.status(400).json({message: 'O ID deve ser informado!'});
    }

    if(id == ''){
        return response.status(400).json({message: 'O ID não pode ser vazio!'});
    }

    next();

};

const validateName = (request, response, next) => {

    const { name } = request.body;

    if(name == undefined || name == null){
        return response.status(400).json({message: 'O Nome deve ser informado!'});
    }

    if(name == ''){
        return response.status(400).json({message: 'O Nome não pode ser vazio!'});
    }

    next();

};

const validateAddress = (request, response, next) => {

    const { address } = request.body;

    if(address == undefined || address == null){
        return response.status(400).json({message: 'O Endereço deve ser informado!'});
    }

    if(address == ''){
        return response.status(400).json({message: 'O Endereço não pode ser vazio!'});
    }

    next();

};

const validatePhone = (request, response, next) => {

    const { phone } = request.body;

    if(phone == undefined || phone == null){
        return response.status(400).json({message: 'O Telefone deve ser informado!'});
    }

    if(phone == ''){
        return response.status(400).json({message: 'O Telefone não pode ser vazio!'});
    }

    next();

};

const validateDescription= (request, response, next) => {

    const { description } = request.body;

    if(description == undefined || description == null){
        return response.status(400).json({message: 'O Endereço deve ser informado!'});
    }

    if(description == ''){
        return response.status(400).json({message: 'O Endereço não pode ser vazio!'});
    }

    next();

};

const validatePrice= (request, response, next) => {

    const { price } = request.body;

    if(price == undefined || price == null){
        return response.status(400).json({message: 'O Preço deve ser informado!'});
    }

    if(price == ''){
        return response.status(400).json({message: 'O Preço não pode ser vazio!'});
    }

    if(price < 0){
        return response.status(400).json({message: 'O Preço não pode ser menor que zero!'});
    }

    next();

};

const validateEmail= (request, response, next) => {

    const { email } = request.body;

    if(email == undefined || email == null){
        return response.status(400).json({message: 'O E-mail deve ser informado!'});
    }

    if(email == ''){
        return response.status(400).json({message: 'O E-mail não pode ser vazio!'});
    }

    next();

};

const validatePassword= (request, response, next) => {

    const { password } = request.body;

    if(password == undefined || password == null){
        return response.status(400).json({message: 'A senha deve ser informado!'});
    }

    if(password == ''){
        return response.status(400).json({message: 'A senha não pode ser vazia!'});
    }

    next();

};

const checkToken = (request, response, next) => {

    const authHeader = request.headers['authorization']
    const token = authHeader.split(" ")[1]

    if(!token){

        return response.status(401).json({message: 'Acesso negado!'});

    }

    try {
        
        jwt.verify(token, process.env.SECRET)

        
    } catch (error) {
        
        return response.status(401).json({message: 'Token Inválido!'});

    }

    next();

}


module.exports = {

    validateId,
    validateName,
    validateAddress,
    validatePhone, 
    validateDescription,
    validatePrice,
    validateEmail,
    validatePassword,
    checkToken

}




