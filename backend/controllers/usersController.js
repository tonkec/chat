const User = require("../models").User;
const sequelize = require("sequelize");
exports.update = async (res, req) => {
  if (req.file) {
    req.body.avatar = req.file.filename;
  }
  try {
    const [rows, result] = await User.update(req.body, {
      where: {
        id: req.user.id,
      },
      returning: true,
      individualHooks: true,
    });

    const user = result[0].get({ raw: true });
    user.avatar = result[0].avatar;
    delete user.password;

    return res.send(user);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
