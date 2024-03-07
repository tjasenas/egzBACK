require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { dataFetch } = require("../helpers/dataFetch");

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email=?`;
    const [row, error] = await dataFetch(sql, [email]);

    if (row.length === 0 || error) {
      return res.json({ msg: "User email or password is incorrect" });
    }

    if (!bcrypt.compareSync(password, row[0].password)) {
      return res.json({ msg: "User password is incorrect" });
    }

    const payload = { email, sub: row[0].id, role: row[0].role };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.json({
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashPassword = bcrypt.hashSync(password, 10);
    const sql = "INSERT INTO users (name, email, password, role, is_active) VALUES (?,?,?,?,?)";
    const [rows, error] = await dataFetch(sql, [name, email, hashPassword, "user", 1]);

    if (error) {
      res.json(error);
      return;
    }

    res.status(201).json({ msg: "Registracija sėkminga!" });
  } catch (error) {
    console.log(error);
  }
};
module.exports.allUsers = async (req, res) => {
  try {
    const sql = "SELECT * FROM users";
    const [rows, error] = await dataFetch(sql);

    if (error) {
      throw new Error(error);
    }
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.satus(404).json({ msg: "Nepavyko gauti skelminu" });
  }
};
module.exports.blockUser = async (req, res) => {
  try {
    const { id, activation } = req.body;
    const sql = `UPDATE users SET is_active=?  WHERE id=?`;
    const [row, error] = await dataFetch(sql, [activation, id]);
    if (error) throw new Error(error);
    res.json({ msg: "Sėkmingai atnaujinta" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Nepavyko atnaujinti" });
  }
};
