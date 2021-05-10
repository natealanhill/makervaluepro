module.exports = (sequelize, DataTypes) => {
    const BOM = sequelize.define('bom', {
        BOMname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        BOMrawGoods:{
            type: DataTypes.JSON,
            allowNull: false,
            unique: false
        },
        BOMtime:{
            type:DataTypes.INTEGER,
            allownull: false,
            unique: false
        },
        rgUnits:{
            type: DataTypes.DECIMAL,
            allowNull: false,
            unique: false
        }



        // I want the user to be able to pull raw good qtys to this table from the raw goods table
       
    })
return BOM;
}