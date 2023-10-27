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

// /relatedMap/:id/:authToken
router.get("/relatedMap/:id", async (req, res) => {
  const id = req.params.id; //0bAsR2unSRpn6BQPEnNlZm
  //   const authToken = req.params.authToken;
  const authToken = await spotifyAPI.getClientAuthToken();
  res.json({
    relatedArtists: await spotifyAPI.getArtistRelatedMap(id, 4, authToken),
  });
});

module.exports = router;
