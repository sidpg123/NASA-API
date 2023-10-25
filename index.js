import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
const API_URL = "https://images-api.nasa.gov"
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res)=>{
    res.render("index.ejs", { data: ""});
})

app.post("/search", async (req, res) => {
    const searchID = req.body.search;
    try {
        const result = await axios.get(`${API_URL}/search?media_type=image&q=${searchID}`);
        const imageUrls = result.data.collection.items.map(item => item.links[0].href);
        const imageIitle = result.data.collection.items.map(item => item.data[0].title);
        res.render("index.ejs", { images: imageUrls, title: imageIitle });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);       
  });
  