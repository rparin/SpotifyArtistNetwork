const axios = require("axios");
const qs = require("qs");
const createNode = require("../lib/Node.js");

class SpotifyAPI {
  constructor(client_id, client_secret) {
    this._client_id = client_id;
    this._client_secret = client_secret;
    this.delay = 1000;
  }

  async getClientAuthToken() {
    const auth_token = Buffer.from(
      `${this._client_id}:${this._client_secret}`,
      "utf-8"
    ).toString("base64");
    try {
      //make post request to SPOTIFY API for access token, sending relevant info
      const token_url = "https://accounts.spotify.com/api/token";
      const data = qs.stringify({ grant_type: "client_credentials" });

      const response = await axios.post(token_url, data, {
        headers: {
          Authorization: `Basic ${auth_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return response.data.access_token;
    } catch (error) {
      //on fail, log the error in console
      //   console.log(error);
      return { error: true, status: error.response.status };
    }
  }

  async getRelatedArtists(id, accessToken) {
    try {
      const url = `https://api.spotify.com/v1/artists/${id}/related-artists`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return { error: false, data: response.data };
    } catch (error) {
      //on fail, log the error in console
      // console.log(error);
      return { error: true, status: error.response.status };
    }
  }

  async getArtistInfo(id, accessToken) {
    try {
      const url = `https://api.spotify.com/v1/artists/${id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return { error: false, data: response.data };
    } catch (error) {
      //on fail, log the error in console
      // console.log(error);
      return { error: true, status: error.response.status };
    }
  }

  async getArtistRelatedMap(id, depth, access_token) {
    const relatedMap = { nodes: [], links: [] };
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const nameNodes = new Set();

    const getArtist = async (info, depth) => {
      console.log(info.id, info.name, depth);

      relatedMap.nodes.push(createNode(info));
      nameNodes.add(info.name);

      if (depth > 0) {
        await delay(this.delay);
        let related = await this.getRelatedArtists(info.id, access_token);
        if (!related.error) {
          related = related.data;

          for (var i = 0; i < related.artists.length; i++) {
            const data = related.artists[i];
            relatedMap.links.push({ source: info.name, target: data.name });
            if (!nameNodes.has(data.name)) {
              await getArtist(data, depth - 1);
            }
          }
        }
      }
    };

    const fArtist = await this.getArtistInfo(id, access_token);
    if (!fArtist.error) {
      await getArtist(fArtist.data, depth);
      return relatedMap;
    } else return null;
  }
}

module.exports = SpotifyAPI;
