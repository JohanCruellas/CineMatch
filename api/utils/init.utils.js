function initUtils() {
    return {
        async initialize(sequelize) {
            const { User } = sequelize.models
            let foundAdmin = await User.findOne({
                where: {
                    isAdministrator: true
                }
            })
            if (!foundAdmin) {
                let admin = await User.create({
                    username: "admin",
                    email: "admin@localhost.com",
                    password: "admin",
                    isAdministrator: true
                })
            }
        }
    };
}

module.exports = initUtils();