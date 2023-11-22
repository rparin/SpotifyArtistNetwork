function createNode(data) {
  const node = {
    id: data.id,
    name: data.name,
    img: data.images.length == 0 ? null : data.images[0].url,
    size: Math.ceil(data.popularity / 10),
  };
  return node;
}

module.exports = createNode;
