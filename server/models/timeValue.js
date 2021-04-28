module.exports = (sequelize, DataTypes) => {
    const TimeValue = sequelize.define('timeValue', {
        timeValue: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false
        },
       
    })
return TimeValue;
}
