const express = require("express");
const SpotifyAPI = require("../helpers/SpotifyAPI");
const router = express.Router();

//Import Env Variables
require("dotenv").config();
const { CLIENT_ID, CLIENT_SECRET } = process.env;

//Create Helper Classes
const spotifyAPI = new SpotifyAPI(CLIENT_ID, CLIENT_SECRET);

router.get("/cAuthToken", async (req, res) => {
  res.json({ access_token: await spotifyAPI.getClientAuthToken() });
});

router.get("/rAuthToken/:authToken", async (req, res) => {
  res.json(await spotifyAPI.refreshToken(req.params.authToken));
});

// /relatedMap/:id/:authToken
router.get("/relatedMap/:id/:authToken", async (req, res) => {
  const id = req.params.id;
  const authToken = req.params.authToken;
  res.json({
    relatedArtists: await spotifyAPI.getArtistRelatedMap(id, 4, authToken),
  });
});

module.exports = router;
