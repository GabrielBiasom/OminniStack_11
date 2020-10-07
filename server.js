/* //vamos falar de coisas basicas da programação em JavaScript

// variaveis
//const mensagem = "Oi, como vai?" // string
//const number = 2.5 // number
//
//function soma(numero1, numero2) {
//    
//    return numero1 + numero2;
//
//}
//
//const somar = soma(6, 8)
//
//console.log(soma(9, 4))
//console.log(somar)
//
//const xicara = {
 //   cor: "branco",
//    tamaho: 10,
//    estaSujo(simNao) {
//        console.log(simNao)
//    }
//}
//
//const cor="preto"
//const tamaho = 5
//function sujo(esta){
//
//}
//
//console.log(xicara.cor)
//
//const xicara2 = {
//    cor,
//    tamanho,
//    sujo
//}
////////////////////////////////////////////////////////////////////* */



// usei o express para criar e configurar meu server
const express = require("express")
const server = express()

const db = require("./db")

/*const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/1570/1570759.svg",
        title: "Curso de programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum necessitatibus repellendu",
        url: "https://www.instagram.com/g_biasom/"
    },
    {
        img: "https://image.flaticon.com/icons/svg/897/897066.svg,
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum necessitatibus repellendu",
        url: "https://www.twitch.tv/yoda"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2731/2731680.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum necessitatibus repellendu",
        url: "https://pt-br.facebook.com/"
    },
    {
        img: "https://image.flaticon.com/icons/svg/776/776541.svg",
        title: "Planos",
        category: "Viagem",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum necessitatibus repellendu",
        url: "https://br.pinterest.com/" 
    },
]*/

//configurar arquivos estátiocos (CSS, Scripts, imagens)
server.use(express.static("public"))

//HABILITAR USO DO REQ.BODY
server.use(express.urlencoded({ extended: true }))

//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// criei uma rota /
// e capturo o pedido do cliente para responder
server.get("/", function (req, res) {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", { ideas: lastIdeas })
    })

})

server.get("/ideias", function (req, res) {



    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", { ideas: reversedIdeas })

    })

})

server.post("/", function (req, res) {
    //INSERIR DADOS NA TABELA

    const query = `
           INSERT INTO ideas(
           image,
           title,
           category,
           description,
           link
       ) VALUES (?,?,?,?,?);
       `

    const values = [

        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,

    ]
    db.run(query, values, function (err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        return res.redirect("/ideias")

        console.log(this)
    })



})

//liguei meu server na porta 3000
server.listen(3000)  