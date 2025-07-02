import express from 'express'
import cors from 'cors'
import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv'

// Load env file with API Key
dotenv.config()
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY)

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

// Test to make sure backend is running
app.get('/', (req, res) => {
  res.send('Hello from your Node.js Backend!')
})

// Post endpoint gets chats from send button on UI and get Gemini response
app.post('/chat', async (req, res) => {
  try {
    // User's input message
    const userMsg = req.body.message

    // Call the api to generate response and configure response model
    const geminiMsg = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMsg,

      // Currently disable thinking feature to get quick response
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    })

    // Respond with Gemini response
    const aiReply = geminiMsg.text
    res.json({ reply: aiReply })
  } catch (error) {
    // Catch errors and respond
    console.error('Gemini API error: ', error)
    res.status(500).json({ reply: 'Sorry, I ran into an error.' })
  }
})

// Start server and listen for requests on the port
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
