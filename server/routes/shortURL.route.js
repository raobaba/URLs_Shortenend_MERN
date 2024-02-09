const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleGetRedirect,
} = require("../controllers/shortURL.controller.js");

const shortURLRouter = express.Router();

shortURLRouter.post("/generate", handleGenerateNewShortURL);

shortURLRouter.get("/analytics/:shortId", handleGetAnalytics);

shortURLRouter.get("/:shortId", handleGetRedirect);

module.exports = shortURLRouter;
