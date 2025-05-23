import express from "express" // Importa o Express.js para criar o servidor web
import multer from 'multer' // Importa o Multer para lidar com uploads de arquivos

// Importa as funções controladoras de posts de um arquivo separado (../controllers/postsController.js)
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"
import cors from "cors"

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSucessStatus: 200
}

const storage = multer.diskStorage({
  // Define o destino dos arquivos enviados (pasta 'uploads/')
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  // Define o nome do arquivo salvo (mantém o nome original)
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

// Cria uma instância do Multer utilizando a configuração de armazenamento e como destino a pasta 'uploads'
const upload = multer({ storage: storage })

// (Comentado) Opção alternativa para definir o destino diretamente na configuração do Multer (apenas para sistemas Linux/macOS)
// const upload = multer({dest:"./uploads"})

// Define uma função para configurar as rotas da aplicação
const routes = (app) => {
  // Permite que o servidor interprete dados JSON enviados nas requisições
  app.use(express.json())
  app.use(cors(corsOptions))

  // Rota GET para listar todos os posts (delega a função listarPosts do controlador)
  app.get("/posts", listarPosts)

  // Rota POST para criar um novo post (delega a função postarNovoPost do controlador)
  app.post("/posts", postarNovoPost)

  // Rota POST para upload de imagem (usa o middleware upload.single('imagem') e delega a função uploadImagem do controlador)
  app.post("/upload", upload.single("imagem"), uploadImagem)

  app.put("/upload/:id", atualizarNovoPost)

}

// Exporta a função routes para ser utilizada no arquivo principal da aplicação
export default routes