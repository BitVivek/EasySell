import User from '../models/user.model.js';

const signup = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        // Omit sensitive information like password before sending the user object in the response
        user.hashed_password = undefined;
        user.salt = undefined;

        return res.status(201).json({ user });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const getUserById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status("400").json({
        error: "User not found",
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

export default { signup, getUserById };
