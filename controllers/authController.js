const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Static user
const staticUser = {
  username: "haziq",
  password: bcrypt.hashSync("123456", 10),
};

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  if (username !== staticUser.username) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, staticUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ username: staticUser.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};
