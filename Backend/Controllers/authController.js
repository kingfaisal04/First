const UserModel = require("../model/user");
const bcrypt = require("bcrypt");

//register
const register = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res
      .status(201)
      .json({ id: user._id, username: user.username, email: user.email });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ 
      message: "Login successful", 
      id: user._id, 
      username: user.username, 
      email: user.email 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
