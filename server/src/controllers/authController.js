const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userModel = require("../model/userModel");

const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, username, email, password } = req.body;

    const usernameCheck = await userModel.listUser(
      { username },
      { task: "one" }
    );

    if (usernameCheck)
      return res.json({ message: "username already used", status: false });
    const emailCheck = await userModel.listUser({ email }, { task: "one" });
    if (emailCheck)
      return res
        .status(500)
        .json({ message: "email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.query;
    console.log(username, password);
    const user = await userModel.listUser(
      { username: username },
      { task: "one" }
    );
    if (!user) {
      return res.json({
        status: false,
        message: "Incorrect Username or Password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        status: false,
        message: "Incorrect Username or Password",
      });
    }
    return res.json({ status: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = { login, signup };
