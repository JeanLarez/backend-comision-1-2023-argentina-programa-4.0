const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/connection');

const Employee = sequelize.define('Employee', {
    employeeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    LastName: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    Title: {
        type: DataTypes.STRING(30),
        allowNull: true,
        default: "N/A",
    },
    TitleOfCourtesy: {
        type: DataTypes.STRING(25),
        allowNull: true,
        default: "Mr(s)",
    },
    BirthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    HireDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    Address: {
        type: DataTypes.STRING(60),
        allowNull: true,
        default: ()=> 'N/A',
    },
    City: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    Region: {
        type: DataTypes.STRING(15),
        allowNull: true,
        default: ()=> 'N/A',
    },
    PostalCode: {
        type: DataTypes.STRING(10),
        allowNull: true,
        default: "90210",
    },
    Country: {
        type: DataTypes.STRING(15),
        allowNull: true,
        default: "USA",
    },
    HomePhone: {
        type: DataTypes.STRING(24),
        allowNull: true,
        default: "1-230",
    },
    Extension: {
        type: DataTypes.STRING(4),
        allowNull: true,
        default: ()=> 'N/A',
    },
    Photo: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    Notes: {
        type: DataTypes.STRING(500),
        allowNull: true,
        default: ()=> 'N/A',
    },
    ReportsTo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        default: 1,
    },
    PhotoPath: {
        type: DataTypes.STRING(255),
        allowNull: true,
        default: ()=> 'N/A',
    }
}, {
    tableName: 'Employees',
    timestamps: false,
});

module.exports = Employee;