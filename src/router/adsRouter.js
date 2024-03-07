const express = require("express");
const { getAllAds, addAd, updateAd, hideAd, removeAd, categories, addCategory } = require("../controllers/adsController");

const adsRouter = express.Router();

adsRouter.get("/api/ads", getAllAds); //
adsRouter.post("/api/addAd", addAd); //
adsRouter.put("/api/updateAd", updateAd); //
adsRouter.put("/api/visability", hideAd);
adsRouter.delete("/api/removeAd", removeAd);

adsRouter.get("/api/categories", categories);
adsRouter.post("/api/addCategory", addCategory);

module.exports = {
  adsRouter,
};
