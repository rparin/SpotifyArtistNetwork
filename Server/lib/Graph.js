function createArtistNode(data) {
  const node = {
    id: data.id,
    name: data.name,
    img: data.images.length == 0 ? null : data.images[0].url,
    followers: data.followers.total,
    pop: data.popularity,
    genres: data.genres,
    size: Math.ceil(data.popularity / 10),
    url: data.external_urls.spotify,
    type: "artist",
  };
  return node;
}

function createUserNode(data) {
  const node = {
    id: data.id,
    name: data.display_name,
    img: data.images.length == 0 ? null : data.images[0].url,
    followers: data.followers.total,
    url: data.external_urls.spotify,
    type: "user",
  };
  return node;
}

module.exports = { createArtistNode, createUserNode };
