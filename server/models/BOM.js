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




       
    })
return BOM;
}