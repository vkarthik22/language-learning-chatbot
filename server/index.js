import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

// Test to make sure backend is running
app.get('/', (req, res) => {
  res.send('Hello from your Node.js Backend!')
})

// Post endpoint gets chats from send button on UI and currently gives dummy response
app.post('/chat', (req, res) => {
  const userMsg = req.body.message
  console.log('This is the user  message: ', userMsg)
  const geminiMsg = `Message recieved: "${userMsg}"`
  res.json({ reply: geminiMsg })
})

// Start server and listen for requests on the port
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
