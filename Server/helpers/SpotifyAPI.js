const axios = require("axios");
const qs = require("querystring");
const crypto = require("crypto");
const createNode = require("../lib/Node.js");
const Spotify = require("../constants/Spotify.js");
const l4Data = require("../L4Data.json");

class SpotifyAPI {
  constructor(client_id, client_secret) {
    this._client_id = client_id;
    this._client_secret = client_secret;
    this._auth_token = new Buffer.from(
      client_id + ":" + client_secret
    ).toString("base64");
    this.delay = (ms) => new Promise((res) => setTimeout(res, ms));
  }

  getAuthEndpoint() {
    const state = crypto
      .randomBytes(Spotify.Variables.randomBytes)
      .toString("hex");
    const querystring = qs.stringify({
      response_type: "code",
      client_id: this._client_id,
      scope: Spotify.Variables.scope,
      redirect_uri: Spotify.Endpoints.authCallback,
      state: state,
    });
    return `${Spotify.Endpoints.auth}${querystring}`;
  }

  async _getToken(data) {
    return await axios.post(
      Spotify.Endpoints.token,
      data,
      Spotify.Headers.basic(this._auth_token)
    );
  }

  async getClientAuthToken() {
    try {
      const data = qs.stringify({
        grant_type: Spotify.Grants.clientCred,
      });
      const res = await this._getToken(data);
      return res.data.access_token;
    } catch (error) {
      console.log(error);
      return { error: true, status: error.response.status };
    }
  }

  async getUserAuthToken(code) {
    try {
      const data = qs.stringify({
        code: code,
        redirect_uri: Spotify.Endpoints.authCallback,
        grant_type: Spotify.Grants.authCode,
      });
      const res = await this._getToken(data);
      return res.data;
    } catch (error) {
      return { error: true, status: error.response.status };
    }
  }

  async refreshToken(refresh_token) {
    try {
      const data = qs.stringify({
        grant_type: Spotify.Grants.refreshToken,
        refresh_token: refresh_token,
      });
      const res = await this._getToken(data);
      return {
        error: false,
        access_token: res.access_token,
        refresh_token: res.refresh_token,
      };
    } catch (error) {
      return { error: true, status: error.response.status };
    }
  }

  async getRelatedArtists(id, accessToken) {
    try {
      const res = await axios.get(
        Spotify.Endpoints.getRelatedArtists(id),
        Spotify.Headers.bearer("Bearer", accessToken)
      );
      return { error: false, data: res.data };
    } catch (error) {
      return { error: true, status: error.response.status };
    }
  }

  async getArtistInfo(id, accessToken) {
    try {
      const res = await axios.get(
        Spotify.Endpoints.getArtists(id),
        Spotify.Headers.bearer("Bearer", accessToken)
      );
      return { error: false, data: res.data };
    } catch (error) {
      return { error: true, status: error.response.status };
    }
  }

  async getArtistRelatedMap(id, depth, access_token) {
    const relatedMap = { nodes: [], links: [] };
    const nameNodes = new Set();

    const getArtist = async (info, depth) => {
      console.log(info.id, info.name, depth);

      relatedMap.nodes.push(createNode(info));
      nameNodes.add(info.name);

      if (depth > 0) {
        await this.delay(Spotify.Variables.delay);
        let related = await this.getRelatedArtists(info.id, access_token);
        // let related = { error: false, data: l4Data[info.name] };
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
