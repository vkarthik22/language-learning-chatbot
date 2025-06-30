<!-- src/views/ChatView.vue -->
<script setup lang="ts">
import { ref } from 'vue'

// Create a variable to store the input message
const inputMsg = ref('')

// Method deals with sending the user's chat to the backend
const sendMsg = async () => {
  const msg = inputMsg.value.trim()

  // Don't send anything if empty message
  if (msg === '') return

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

    // Catch the error and display it
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error)
  }

  // Clear the message after it gets sent
  inputMsg.value = ''
}
</script>

<template>
  <main>
    <div class="chatbox">
      <div class="messages">
        <h1>Welcome to your Language Chatbot!</h1>
        <p>This is where the chat interface will go.</p>
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
  max-width: 80vw;
  height: 70vh;
  background-color: white;
  border-radius: 6px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  text-align: center;
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
