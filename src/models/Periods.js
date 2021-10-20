module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Periods',
        {
            // id: {
            //     primaryKey: true,
            //     type: DataTypes.INTEGER,
            //     allowNull: false,
            //     autoIncrement: true
            // },
            id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.INTEGER
            },
            temperature: {
                type: DataTypes.DECIMAL(4, 2)
            },
            is_make_love: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            is_record: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            is_start: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            is_end: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            pain_level: {
                type: DataTypes.INTEGER
            },
            flow_level: {
                type: DataTypes.INTEGER
            },
            color_level: {
                type: DataTypes.INTEGER
            },
            state: {
                type: DataTypes.STRING
            },
            start_date: {
                type: DataTypes.DATE(6)
            },
            end_date: {
                type: DataTypes.DATE(6)
            }
        },
        {
            underscored: true
        }
    );
};
