module.exports = (sequelize, DataTypes) => {
    const RawGood = sequelize.define('rawGood', {
        rgName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        rgUOM: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        rgQty: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            unique: false
        },
        rgCost: {
            type: DataTypes.DECIMAL,
            allowNull:true,
            unique: false
        },
        rgVendor: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },

    })
return RawGood;
}



        