import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js"
import fs from "fs"
import gerarDescricaoGemini from "../services/geminiService.js"

export async function listarPosts(req, res) {
      // Chama a função para buscar os posts
      const posts = await getTodosPosts()
      // Envia os posts como resposta em formato JSON com status 200 (OK)
      res.status(200).json(posts)
}

export async function postarNovoPost(req, res) {
      const novoPost = req.body
      try {
            const postCriado = await criarPost(novoPost)
            res.status(200).json(postCriado)
      } catch(erro) {
            console.error(erro.message)
            res.status(500).json({"Erro":"Falha de requisição"})
      }
}

export async function uploadImagem(req, res) {
      const novoPost = {
            descricao: "",
            imgUrl: req.file.originalname,
            alt: ""
      }
      try {
            const postCriado = await criarPost(novoPost)
            const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
            fs.renameSync(req.file.path, imagemAtualizada)
            res.status(200).json(postCriado)
      } catch(erro) {
            console.error(erro.message)
            res.status(500).json({"Erro":"Falha na requisição"})
      }
}

export async function atualizarNovoPost(req, res) {
      const id = req.params.id
      const urlImagem = `http://localhost:3000/${id}.png`
      try {
            const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
            const descricao = await gerarDescricaoGemini(imgBuffer)

            const post = {
                  imgUrl: urlImagem,
                  descricao: descricao,
                  alt: req.body.alt
            }

            const postCriado = await atualizarPost(id, post)      
            res.status(200).json(postCriado)
      } catch(erro) {
            console.error(erro.message)
            res.status(500).json({"Erro":"Falha na requisição"})
      }
}