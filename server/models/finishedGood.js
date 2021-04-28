module.exports = (sequelize, DataTypes) => {
    const FinishedGood = sequelize.define('finishedGood', {
        fgName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        fgSRP: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false
        },
        fgCOGS: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false
        },
        // fgPicture: {
        //     type: DataTypes.NUM,
        //     allowNull:true,
        //     unique: false
        // },
        fgMakerPrice: {
            type: DataTypes.INTEGER,
            allownull: true,
            unique: false
        }
    })
return FinishedGood;
}