const axios = require("axios");
const qs = require("querystring");
const crypto = require("crypto");
const createNode = require("./Node.js");
const SPOTIFY = require("../constants/Spotify.js");

class SpotifyAPI {
  constructor(client_id, client_secret) {
    this._client_id = client_id;
    // this._client_secret = client_secret;
    this._auth_token = new Buffer.from(
      client_id + ":" + client_secret
    ).toString("base64");
    this.delay = (ms) => new Promise((res) => setTimeout(res, ms));
  }

  getAuthEndpoint() {
    const state = crypto
      .randomBytes(SPOTIFY.Variables.randomBytes)
      .toString("hex");
    const querystring = qs.stringify({
      response_type: "code",
      client_id: this._client_id,
      scope: SPOTIFY.Variables.scope,
      redirect_uri: SPOTIFY.Endpoints.authCallback,
      state: state,
    });
    return `${SPOTIFY.Endpoints.auth}${querystring}`;
  }

  async _getToken(data) {
    return await axios.post(
      SPOTIFY.Endpoints.token,
      data,
      SPOTIFY.Headers.basic(this._auth_token)
    );
  }

  async getClientAuthToken() {
    const data = qs.stringify({
      grant_type: SPOTIFY.Grants.clientCred,
    });
    return await this._getToken(data);
  }

  async getUserAuthToken(code) {
    try {
      const data = qs.stringify({
        code: code,
        redirect_uri: SPOTIFY.Endpoints.authCallback,
        grant_type: SPOTIFY.Grants.authCode,
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
        grant_type: SPOTIFY.Grants.refreshToken,
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

  async searchArtist(artist, page, accessToken) {
    const endPoint =
      page == "undefined"
        ? SPOTIFY.Endpoints.searchArtist(artist)
        : `https://api.spotify.com/v1/search?${page}`;

    return await axios.get(
      endPoint,
      SPOTIFY.Headers.bearer("Bearer", accessToken)
    );
  }

  async searchArtistPage(query, accessToken) {
    return await axios.get(
      `https://api.spotify.com/v1/search?${query}`,
      SPOTIFY.Headers.bearer("Bearer", accessToken)
    );
  }

  async getRelatedArtists(id, accessToken) {
    return await axios.get(
      SPOTIFY.Endpoints.getRelatedArtists(id),
      SPOTIFY.Headers.bearer("Bearer", accessToken)
    );
  }

  async getArtistInfo(id, accessToken) {
    return await axios.get(
      SPOTIFY.Endpoints.getArtists(id),
      SPOTIFY.Headers.bearer("Bearer", accessToken)
    );
  }

  async getArtistRelatedMap(id, depth, access_token) {
    const relatedMap = { nodes: [], links: [] };
    const idNodes = new Set();

    const getArtist = async (info, depth) => {
      if (depth != 0) {
        console.log(info.id, info.name, depth);
      }

      relatedMap.nodes.push(createNode(info));
      idNodes.add(info.id);

      if (depth > 0) {
        await this.delay(SPOTIFY.Variables.delay);
        let related = await this.getRelatedArtists(info.id, access_token);

        if (related.status == 200) {
          related = related.data;
          for (var i = 0; i < related.artists.length; i++) {
            const data = related.artists[i];
            relatedMap.links.push({ source: info.id, target: data.id });
            if (!idNodes.has(data.id)) {
              await getArtist(data, depth - 1);
            }
          }
        }
      }
    };

    try {
      const fArtist = await this.getArtistInfo(id, access_token);
      await getArtist(fArtist.data, depth);
      return { data: relatedMap, status: 200 };
    } catch (error) {
      return { data: null, status: error.response.status };
    }
  }
}

module.exports = SpotifyAPI;
