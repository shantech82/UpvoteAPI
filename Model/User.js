var sequelize = require('../dbconfig');

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    activatekey: {
        type: Sequelize.STRING
    },
    isinvestor: {
        type: Sequelize.BOOLEAN
    },
    profileimageurl: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.STRING
    },

    bio: {
        type: Sequelize.STRING
    },
    investmentfocus: {
        type: Sequelize.BOOLEAN
    },
    averagenoofinvestment: {
        type: Sequelize.INT
    },
    averageinvestmentsizeperyear: {
        type: Sequelize.INT
    },
    id: {
        type: Sequelize.INT
    },
    isactive: {
        type: Sequelize.BOOLEAN
    },
    ismoderator: {
        title: Sequelize.BOOLEAN
    },
    ispresenter: {
        title: Sequelize.BOOLEAN
    }

});

module.exports =  User;