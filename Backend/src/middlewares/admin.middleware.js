const userModel = require("../models/user.model");
const { isAdminEmail } = require("../config/admins");

const adminOnly = async (req, res, next) => {
    const user = await userModel.findById(req.user.id).select("-password");

    if (!user || !isAdminEmail(user.email)) {
        return res.status(403).json({
            message: "Admin access required"
        });
    }

    req.admin = user;
    next();
};

module.exports = adminOnly;
