const Urls = {
  api: "https://api.spotify.com/v1",
  accounts: "https://accounts.spotify.com",
  host: "http://localhost:8080",
  authRedirect: "http://localhost:3000/mynetwork",
};

function getUser(id) {
  return `${Urls.api}/users/${id}`;
}

function getArtists(id) {
  return `${Urls.api}/artists/${id}`;
}

function getRelatedArtists(id) {
  return `${Urls.api}/artists/${id}/related-artists`;
}

function searchArtist(artist) {
  return `${Urls.api}/search?q=${artist}&type=artist`;
}

function searchQuery(query) {
  return `${Urls.api}/search?${query}`;
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
  authRedirect: `${Urls.authRedirect}`,
  auth: `${Urls.accounts}/authorize?`,
  token: `${Urls.accounts}/api/token`,
  myInfo: `${Urls.api}/me`,
  myFollowingArtists: `${Urls.api}/me/following?type=artist&limit=50`,
  searchQuery: searchQuery,
  getArtists: getArtists,
  getRelatedArtists: getRelatedArtists,
  searchArtist: searchArtist,
  getUser: getUser,
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
  userScope: "user-follow-read user-top-read", //user-read-private user-read-email
};

module.exports = {
  Endpoints,
  Grants,
  Headers,
  Variables,
};
