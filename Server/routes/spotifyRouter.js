const express = require("express");
const SpotifyAPI = require("../lib/SpotifyAPI");
const router = express.Router();
const qs = require("querystring");
const SPOTIFY = require("../constants/Spotify.js");

//Import Env Variables
require("dotenv").config();
const { CLIENT_ID, CLIENT_SECRET } = process.env;

//Create Helper API Class
const spotifyAPI = new SpotifyAPI(CLIENT_ID, CLIENT_SECRET);

router.get("/cAuthToken", async (req, res) => {
  const response = await spotifyAPI.getClientAuthToken();
  res
    .status(response.status)
    .json(response.status == 200 ? response.data.access_token : null);
});

router.get("/askAuth", async (req, res) => {
  res.redirect(spotifyAPI.getAuthEndpoint());
});

router.get("/authCallback", async (req, res) => {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var redirect_uri = SPOTIFY.Endpoints.authRedirect;

  if (state === null) {
    res.redirect(
      "/#" +
        qs.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    const data = await spotifyAPI.getUserAuthToken(code);
    if (data.error) {
      res.redirect(`${redirect_uri}?error=true&status=${data.status}`);
    } else {
      res.redirect(
        `${redirect_uri}?error=false&access_token=${data.access_token}`
      );
      // res.redirect(
      //   `${redirect_uri}?error=false&access_token=${data.access_token}&refresh_token=${data.refresh_token}&expires_in=${data.expires_in}&token_type=${data.token_type}`
      // );
    }
  }
});

router.get("/rAuthToken/:authToken", async (req, res) => {
  res.json(await spotifyAPI.refreshToken(req.params.authToken));
});

router.get("/search/:artist/:page/:authToken", async (req, res) => {
  const response = await spotifyAPI.searchArtist(
    req.params.artist,
    req.params.page,
    req.params.authToken
  );
  res
    .status(response.status)
    .json(response.status == 200 ? response.data : null);
});

router.get("/relatedMap/:id/:depth/:authToken", async (req, res) => {
  const response = await spotifyAPI.getArtistRelatedMap(
    req.params.id,
    req.params.depth,
    req.params.authToken
  );
  res.status(response.status).json(response.data);
});

router.get("/userInfo/:id/:authToken", async (req, res) => {
  const response = await spotifyAPI.getUserInfo(
    req.params.id,
    req.params.authToken
  );
  res
    .status(response.status)
    .json(response.status == 200 ? response.data : null);
});

router.get("/myInfo/:authToken", async (req, res) => {
  const response = await spotifyAPI.getMyInfo(req.params.authToken);
  res
    .status(response.status)
    .json(response.status == 200 ? response.data : null);
});

router.get("/myFollowingArtists/:authToken", async (req, res) => {
  const response = await spotifyAPI.getMyArtistMap(req.params.authToken);
  res
    .status(response.status)
    .json(response.status == 200 ? response.data : null);
});

module.exports = router;
