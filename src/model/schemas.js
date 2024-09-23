const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const Restaurant = sequelize.define('Restaurant', {
    id: {
        type: DataTypes.INTEGER,      
        autoIncrement: true,          
        primaryKey: true,             
        allowNull: false              
    },
    name: {
        type: DataTypes.STRING,       
        allowNull: false              
    },
    address: {
        type: DataTypes.TEXT,         
        allowNull: false              
    },
    phone: {
        type: DataTypes.STRING,         
        allowNull: false 
    }
}, {
    tableName: 'restaurants',        
    timestamps: true              
});

const Item = sequelize.define('Item', {
    id: {
        type: DataTypes.INTEGER,      
        autoIncrement: true,          
        primaryKey: true,             
        allowNull: false              
    },
    name: {
        type: DataTypes.STRING,       
        allowNull: false              
    },
    description: {
        type: DataTypes.TEXT,         
        allowNull: false              
    },
    price: {
        type: DataTypes.FLOAT,         
        allowNull: false              
    },

}, {
    tableName: 'items',        
    timestamps: true              
});

Restaurant.hasMany(Item);
Item.belongsTo(Restaurant);


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,       // ID auto-incremental
        primaryKey: true,          // Chave primária
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),  
        allowNull: false,
        unique: true,                
        validate: {
            isEmail: true            
        },
    },
    password: {
        type: DataTypes.STRING,      
        allowNull: false
    } 
}, {
    tableName: 'users',
    timestamps: true              
                  
});


module.exports = {
    Restaurant, Item, User, sequelize   
}