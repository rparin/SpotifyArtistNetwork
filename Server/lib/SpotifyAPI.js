const axios = require("axios");
const qs = require("querystring");
const crypto = require("crypto");
const { createArtistNode, createUserNode } = require("./Graph.js");
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
      scope: SPOTIFY.Variables.userScope,
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

  async _getRequestBearer(endpoint, accessToken) {
    try {
      const response = await axios.get(
        endpoint,
        SPOTIFY.Headers.bearer("Bearer", accessToken)
      );
      return response;
    } catch (error) {
      return { status: error.response.status };
    }
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
        : SPOTIFY.Endpoints.searchQuery(page);
    return this._getRequestBearer(endPoint, accessToken);
  }

  async getRelatedArtists(id, accessToken) {
    return this._getRequestBearer(
      SPOTIFY.Endpoints.getRelatedArtists(id),
      accessToken
    );
  }

  async getArtistInfo(id, accessToken) {
    return this._getRequestBearer(
      SPOTIFY.Endpoints.getArtists(id),
      accessToken
    );
  }

  async getUserInfo(id, accessToken) {
    return this._getRequestBearer(SPOTIFY.Endpoints.getUser(id), accessToken);
  }

  async getMyInfo(accessToken) {
    return this._getRequestBearer(SPOTIFY.Endpoints.myInfo, accessToken);
  }

  async getMyFollowingArtists(accessToken) {
    return this._getRequestBearer(
      SPOTIFY.Endpoints.myFollowingArtists,
      accessToken
    );
  }

  async getMyArtistMap(accessToken) {
    const userInfo = await this.getMyInfo(accessToken);
    const followingArtists = await this.getMyFollowingArtists(accessToken);
    if (followingArtists.status != 200 || userInfo.status != 200) {
      return {
        status:
          userInfo.status != 200 ? userInfo.status : followingArtists.status,
      };
    }

    const followMap = { nodes: [], links: [] };
    followMap.nodes.push(createUserNode(userInfo.data));
    followingArtists.data.artists.items.map((item, _index) => {
      followMap.nodes.push(createArtistNode(item));
      followMap.links.push({
        source: userInfo.data.id,
        target: item.id,
        linkType: "main",
      });
    });

    return { data: followMap, status: 200 };
  }

  async getArtistRelatedMap(id, depth, access_token) {
    const relatedMap = { nodes: [], links: [] };
    const idNodes = new Set();

    const getArtist = async (info, depth) => {
      if (depth != 0) {
        console.log(info.id, info.name, depth);
      }

      relatedMap.nodes.push(createArtistNode(info));
      idNodes.add(info.id);

      if (depth > 0) {
        await this.delay(SPOTIFY.Variables.delay);
        let related = await this.getRelatedArtists(info.id, access_token);
        if (related.status == 200) {
          for (var i = 0; i < related.data.artists.length; i++) {
            const data = related.data.artists[i];
            relatedMap.links.push({ source: info.id, target: data.id });
            if (!idNodes.has(data.id)) {
              await getArtist(data, depth - 1);
            }
          }
        } else {
          throw new Error("Error fetching related artists");
        }
      }
    };

    try {
      const fArtist = await this.getArtistInfo(id, access_token);
      await getArtist(fArtist.data, depth);
      return { data: relatedMap, status: 200 };
    } catch (error) {
      return { data: null, status: 500 };
    }
  }
}

module.exports = SpotifyAPI;
