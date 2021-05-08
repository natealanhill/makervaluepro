module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        fname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        // isAdmin:{
        //     type: DataTypes.BOOLEAN,
        //     allowNull: true,
        //     unique: false
        // }

        // urlname: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        //     unique: false
        // }
    })
    return User;
}