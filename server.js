// Server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");


const categoriesController = require("./categories/CategoriesController");
const Category = require("./categories/Category");

const articlesController = require("./articles/AriclesController");
const Article = require("./articles/Article"); 

const UsersController = require("./users/UsersController");
const User = require("./users/User");
 
// Session
app.use(session({
    secret: "QualquercoisaKOKasaskoKOQkwoaskasldfvhaha", cookie: {
        maxAge: 30000000
    }
}))

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

app.use("/", UsersController);

app.get("/session", (req, res) => {
    
});

app.get("/leitura", (req, res) => {

});

app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles, categories})
        })
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
            Category.findAll().then(categories => {
                res.render("article", {article, categories})
            })
        } else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
})

app.get("/category/:slug", (req, res) => {
    const slug = req.params.slug;
    Category.findOne({
        where:{
            slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories})
            });

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