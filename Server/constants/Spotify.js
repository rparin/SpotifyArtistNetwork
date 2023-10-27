const Urls = {
  api: "https://api.spotify.com",
  accounts: "https://accounts.spotify.com",
  host: "http://localhost:8080",
};

function getArtists(id) {
  return `${Urls.api}/v1/artists/${id}`;
}

function getRelatedArtists(id) {
  return `${Urls.api}/v1/artists/${id}/related-artists`;
}

const HeaderContent = {
  urlencoded: "application/x-www-form-urlencoded",
};

function getBasicHeader(authToken) {
  return {
    headers: {
      Authorization: `Basic ${authToken}`,
      "Content-Type": HeaderContent.urlencoded,
    },
  };
}

function getBearerHeader(tokenType, authToken) {
  return {
    headers: {
      Authorization: `${tokenType} ${authToken}`,
    },
  };
}

const Endpoints = {
  authCallback: `${Urls.host}/api/spotify/authCallback`,
  auth: `${Urls.accounts}/authorize?`,
  token: `${Urls.accounts}/api/token`,
  getArtists: getArtists,
  getRelatedArtists: getRelatedArtists,
};

const Headers = {
  basic: getBasicHeader,
  bearer: getBearerHeader,
};

const Grants = {
  refreshToken: "refresh_token",
  authCode: "authorization_code",
  clientCred: "client_credentials",
};

const Variables = {
  delay: 1000,
  randomBytes: 20,
  scope: "user-read-private user-read-email",
};

module.exports = {
  Endpoints,
  Grants,
  Headers,
  Variables,
};
