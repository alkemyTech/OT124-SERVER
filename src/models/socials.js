'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Socials extends Model {
        static associate(models) {}
    }

    Socials.init(
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            organizationId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'organization',
                    key: 'id'
                },
                allowNull: false
            },
            facebook: {
                type: DataTypes.STRING,
                allowNull: true
            },
            linkedin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            instagram: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, 
        { 
            sequelize, 
            modelName: 'socials', 
            tableName: 'socials', 
            timestamps: true, 
            paranoid: true 
        }
    );

    return Socials;
}