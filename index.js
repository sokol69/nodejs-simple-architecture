import express from 'express'

import { userRouter } from './users/index.js'

const app = express()
const PORT = 8000

app.use((req, res, next) => {
  console.log(`Time log: ${Date.now()}`)
  next()
})

app.route('/hello')
  .get((req, res) => {
    res.send('Hello GET')
  })
  .post((req, res) => {
    throw new Error('Error from POST /hello')
  })

app.use('/users', userRouter)

app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(500).send(err.message)
})

app.listen(PORT, () => {
  console.log('Server started on http://localhost:8000')
})