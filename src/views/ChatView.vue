<!-- src/views/ChatView.vue -->
<script setup lang="ts">
import { ref, nextTick } from 'vue'

// Create an interface for a message
interface Message {
  id: number
  text: string
  sender: 'user' | 'ai'
}

// Create an array to store all the chats
const fullChat = ref<Message[]>([{ id: 1, text: 'Hello! Ask me anything!', sender: 'ai' }])

// Create a variable to store the input message
const inputMsg = ref('')
const messageContainer = ref<HTMLElement | null>(null)

// Function to automatically scroll to the bottom when new messages are added
const scrollToBottom = () => {
  // nextTick waits for the DOM to update before trying to scroll
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  })
}

// Method deals with sending the user's chat to the backend
const sendMsg = async () => {
  const msg = inputMsg.value.trim()

  // Don't send anything if empty message
  if (msg === '') return

  // Add the message to fullChat to be displayed visually
  fullChat.value.push({ id: fullChat.value.length + 1, text: msg, sender: 'user' })

  // Call the backend API endpoint
  try {
    // Backend location
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      // Sends the user message
      body: JSON.stringify({ message: msg }),
    })

    // Check if the server gave an error
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    // Get Gemini response and add it to fullChat
    const data = await response.json()
    const aiMsg = data.reply
    fullChat.value.push({ id: Date.now() + 1, text: aiMsg, sender: 'ai' })
    scrollToBottom()

    // Catch the error and display it
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error)
    fullChat.value.push({
      id: Date.now() + 1,
      text: 'Sorry, I had trouble connecting. Please try again.',
      sender: 'ai',
    })

    scrollToBottom()
  }

  // Clear the message after it gets sent
  inputMsg.value = ''
}
</script>

<template>
  <main>
    <div class="chatbox">
      <!--- Add a 'ref' to the messagaes container from earlier to control scrolling-->
      <div class="messages" ref="messageContainer">
        <!-- Loop Through the full chat-->
        <div
          v-for="message in fullChat"
          v-bind:key="message.id"
          class="message-row"
          v-bind:class="message.sender"
        >
          <div class="bubble">
            {{ message.text }}
          </div>
        </div>
      </div>
      <div class="inputArea">
        <!-- This will send the input in the text box by calling send msg. Also clicking the button will send the input -->
        <input
          v-model="inputMsg"
          @keydown.enter="sendMsg"
          type="text"
          placeholder="Type your message here ..."
        />
        <button @click="sendMsg">Send</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: sans-serif;
  background-color: #f0f2f5;
}

.chatbox {
  width: 90%;
  max-width: 800px;
  height: 80vh;
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px;
}
.message-row {
  display: flex;
}

.message-row.user {
  justify-content: flex-end;
}

.message-row.ai {
  justify-content: flex-start;
}

.bubble {
  padding: 10px 15px;
  border-radius: 18px;
  max-width: 70%;
  word-wrap: break-word;
  line-height: 1.4;
  text-align: left;
}

.message-row.user .bubble {
  background-color: #1f88eb;
  color: white;
  border-bottom-right-radius: 4px;
}

.message-row.ai .bubble {
  background-color: #e5e5ea;
  color: black;
  border-bottom-left-radius: 4px;
}

.inputArea {
  display: flex;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
}

input[type='text'] {
  flex-grow: 1;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 6px;
  font-size: 1rem;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #1f88eb;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #053aad;
}
</style>
