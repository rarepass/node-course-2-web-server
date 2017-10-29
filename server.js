const express = require("express");
const hbs = require("hbs")
const fs = require("fs");
const port = process.env.PORT || 3000;
var app = express();
app.set("view engine", "hbs")

app.use(express.static(__dirname + '/public'))
app.use((req, res, next) => {
    var now = new Date().toString();
    
    var log = `${now}; ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log + "\n");
    next();
})

app.use((req, res, next) => {
    res.render("maintenance.hbs")
});


hbs.registerPartials(__dirname + "/views/partials")

hbs.registerHelper("getCurrentYear", ()=>{
    return new Date().getFullYear()
});

hbs.registerHelper("screamIt", (text)=>{
    return text.toUpperCase();
})

app.get(
    "/",
     (req, res) => {
        //res.send("<h1>hello express</h1>");
        res.send({
            name:"mikoi",
            likes: [
                "sake",
                "commedy"
            ]
        })
     }
);


app.get("/about",(req,res)=>{
    res.render("about.hbs", {
        pageTitle: "About Page",
    })
});

app.get("/home",(req,res)=>{
    res.render("home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage: "welcome to my page",
    })
});

app.get("/bad", (req,res) => {
    res.send({
        errorMessage:"upp"
    });
});


app.listen(port, () => {
    console.log("seve is up port :" + port);
});