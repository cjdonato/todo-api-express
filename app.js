const express = require('express')
const { PrismaClient } = require('@prisma/client') // TODO require vs from
const cors = require('cors');

const prisma = new PrismaClient()
const app = express()
const port = parseInt(process.env.PORT) || 3001;

app.use(express.json())
app.use(cors({ origin: true, credentials: true }));

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.get('/todo', async (req, res) => {
  const todos = await prisma.todo.findMany()
  res.json(todos)
})

app.post('/todo', async (req, res) => {
  const { name } = req.body

  const result = await prisma.todo.create({
    data: { name }
  })

  res.json(result)
})

app.put('/todo', async (req, res) => {
  const { id, name, isDone } = req.body

  const result = await prisma.todo.update({
    where: { id },
    data: { name, isDone }
  })

  res.send(result)
})

app.delete('/todo', async (req, res) => {
  const { id } = req.body

  const result = await prisma.todo.delete({
    where: { id }
  })

  res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})