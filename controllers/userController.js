const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ctrlUser = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await Users.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: "The email already exists." });
      }

      //if user isn't present then register it
      //firstly hash the entered
      //   var salt = await bcrypt.genSalt(10);
      //   var hashedPassword = bcrypt.hashSync(password, salt);
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new Users({
        username: username,
        email: email,
        password: hashedPassword,
      });

      //save user to database
      await newUser.save();
      res.json({ msg: "Sign up sucess" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ msg: "User doesn't exist!" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect Password" });
      }

      //if login sucess create token
      const payload = { id: user._id, name: user.username };
      const token = jwt.sign(payload, process.env.TOKEN_SECRETE, {
        expiresIn: "1d",
      });

      res.json({ token });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  verifiedToken: (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) {
        return res.send(false);
      }

      jwt.verify(token, process.env.TOKEN_SECRETE, async (err, verified) => {
        if (err) {
          return res.send(false);
        }

        const user = await Users.findById(verified.id);

        if (!user) {
          return res.send(false);
        }

        return res.send(true);
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = ctrlUser;
