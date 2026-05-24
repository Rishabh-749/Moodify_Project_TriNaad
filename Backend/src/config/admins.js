const ADMIN_USERS = [
    {
        email: "mahadev@gmail.com",
        password: "SadaShiv@1234",
        username: "Mahadev"
    },
    {
        email: "rishabh@gmail.com",
        password: "Rishi@1234",
        username: "Rishabh"
    }
];

function normalizeEmail(email = "") {
    return email.trim().toLowerCase();
}

function isAdminEmail(email = "") {
    const normalizedEmail = normalizeEmail(email);

    return ADMIN_USERS.some((admin) => admin.email === normalizedEmail);
}

async function syncAdminUsers(userModel) {
    for (const admin of ADMIN_USERS) {
        const existingUser = await userModel.findOne({
            email: admin.email
        }).select("+password");

        if (!existingUser) {
            await userModel.create(admin);
            continue;
        }

        let shouldSave = false;

        if (existingUser.username !== admin.username) {
            existingUser.username = admin.username;
            shouldSave = true;
        }

        existingUser.password = admin.password;
        shouldSave = true;

        if (shouldSave) {
            await existingUser.save();
        }
    }
}

module.exports = {
    ADMIN_USERS,
    normalizeEmail,
    isAdminEmail,
    syncAdminUsers
};
