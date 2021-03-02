// Server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const categoryModel = require("./categories/Category");

const articlesController = require("./articles/AriclesController");
const articleModel = require("./articles/Article");
const Article = require("./articles/Article");

// View Engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    });


// Rotas
app.use("/", categoriesController);

app.use("/", articlesController);

app.get("/", (req, res) => {
    Article.findAll({
        order: [['id', 'DESC']]
    }).then(articles => {
        res.render("index", {articles});
    });
});

app.get("/:slug", (req, res) => {
    const slug = req.params.slug;
    Article.findOne({
        where: {
            slug
        }
    }).then(article => {
        if(article != undefined){
            res.render("article", {article})
        } else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
})

app.listen(3000, () => {
    console.log("Server ativo!")
});