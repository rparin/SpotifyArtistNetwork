const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/api/home", (req, res) => {
  res.json({ message: "Server loaded!" });
});

//Import spotify router
const spRouter = require("./routes/spotifyRouter");
app.use("/api/spotify", spRouter);

/*

Node type:
  id: artistName
  img: artistImage
  size: size based on popularity

{
  ArtistName: {
    related: set()
    image: string
    id: string
    popularity: int
    followers: int
    genres: []
    
  },
  ArtistName: {
    related: set()
    image: string
    id: string
    popularity: int
    followers: int
    genres: []
    
  }
}
*/
