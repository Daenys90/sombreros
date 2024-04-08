const express = require('express')
const app = express()
app.listen(3000, () => {
console.log('El servidor está inicializado en el puerto 3000')
})

app.use(express.static("assets"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
  
  //arreglo
  const usuarios = [
    "Juan",
    "Jocelyn",
    "Astrid",
    "Maria",
    "Ignacia",
    "Javier",
    "Brian",
  ];
  
  //1
  app.get("/abracadabra/usuarios", (req, res) => {
        res.send({ usuarios });
  });


  //2

  app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  

    const Auth = req.header("Authorization");
    console.log(Auth);
      
    const usuario = req.params.usuario;
    usuarios.includes(usuario) ? next() : res.redirect("/who.jpeg");
  });
    
  app.use("/abracadabra/juego/:usuario", (req, res) => {
    const usuario = req.params.usuario;
    usuarios.includes(usuario), res.sendFile(__dirname + "/index.html");
  });

  app.get("/abracadabra/conejo/:n", (req, res) => {
    const n = Math.floor(Math.random() * 4) + 1;
    const numero = parseInt(req.params.n);
    if (numero === n) {
      const html = `<div class="card">
    <img src="/conejito.jpg" class="card-img-top" width="50%" alt="conejo">
   
  </div>`;
      res.send(html); 
    } else {
      res.sendFile(__dirname + "/assets/voldemort.jpg");
    }
  });
  
  
  app.get("*", (req, res) => {
    //
    res.send("Errrror");
  });