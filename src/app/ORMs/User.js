const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../kernel/database")

const User = sequelize.define('users', {
	id: {
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true
	},
	name: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	subject: {
		type: DataTypes.TEXT,
		allowNull: true
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: true
	},
	createdAt: {
		field: 'created_at',
		type: "TIMESTAMP",
	},
	updatedAt: {
		field: 'updated_at',
		type: "TIMESTAMP",
	},
}, {
	timestamps: true
});

module.exports = User
