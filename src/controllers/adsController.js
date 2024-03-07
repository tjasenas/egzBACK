const { dataFetch } = require("../helpers/dataFetch");

module.exports.getAllAds = async (req, res) => {
  try {
    const sql = "SELECT * FROM items";
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
module.exports.addAd = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;

    console.log(title, description, price, category, image);

    const sql = `INSERT INTO ads (title, description, price, cat_id, image, visibility) VALUES (?,?,?,?,?,?)`;
    const [row, error] = await dataFetch(sql, [title, description, price, category, image, 1]);
    if (error) throw new Error(error);
    res.json({ msg: "Produktas sėkmingai pridėtas" });
  } catch (error) {
    console.log(error);
    res.satus(404).json({ msg: "Nepavyko prideti skelmino" });
  }
};
module.exports.updateAd = async (req, res) => {
  try {
    const { id, title, description, price, stock, category, imgUrl } = req.body;
    const sql = `UPDATE items SET title=?, description=?, price=?, stock=?, cat_id=?, img_url=?  WHERE id=?`;
    const [row, error] = await dataFetch(sql, [title, description, price, stock, category, imgUrl, id]);
    if (error) throw new Error(error);
    res.json({ msg: "Produktas sėkmingai atnaujintas" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.hideAd = async (req, res) => {
  try {
    const { id, visability } = req.body;
    const sql = `UPDATE ads SET  visibility=?  WHERE id=?`;
    const [row, error] = await dataFetch(sql, [visability, id]);
    if (error) throw new Error(error);
    res.json({ msg: "Sėkmingai atnaujintas" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.removeAd = async (req, res) => {
  try {
    const { id } = req.body;
    const sql = `DELETE FROM ads WHERE id=? LIMIT 1`;
    const [row, error] = await dataFetch(sql, [id]);
    if (error) throw new Error(error);
    res.json({ msg: "Skelbimas sekmingai istrintas" });
  } catch (error) {
    console.log(error);
    res.satus(400).json({ msg: "Nepavyko istrinti skelbimo" });
  }
};

module.exports.categories = async (req, res) => {
  try {
    const sql = "SELECT * FROM categories";
    const [rows, error] = await dataFetch(sql);

    if (error) {
      throw new Error(error);
    }
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.satus(404).json({ msg: "Nepavyko gauti kategoriju" });
  }
};
module.exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const sql = `INSERT INTO categories (name) VALUES (?)`;
    const [row, error] = await dataFetch(sql, [name]);
    if (error) throw new Error(error);
    res.json({ msg: "Kategorija sėkmingai pridėta" });
  } catch (error) {
    console.log(error);
    res.satus(404).json({ msg: "Nepavyko prideti kategorijos" });
  }
};
