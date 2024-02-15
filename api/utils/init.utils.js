function initUtils() {
    return {
        async initialize(sequelize) {
            const { User, Role } = sequelize.models

            await Role.findOrCreate({
                where: { name: 'admin' }
            })
            
            let foundAdmin = await User.findOne({
                include: {
                    model: Role,
                    as: 'roles',
                    where: {
                        name: 'admin'
                    }
                }
            })

            if (!foundAdmin) {
                let admin = await User.create({
                    username: "admin",
                    email: "admin@localhost.com",
                    password: "admin",
                })

                let role = await Role.findOne({
                    where: {
                        name: 'admin'
                    }
                })

                await admin.addRole(role)
            }
        }
    };
}

module.exports = initUtils();