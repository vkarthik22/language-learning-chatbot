<!-- src/views/ChatView.vue -->
<script setup lang="ts">
// You will add your chat logic here later
</script>

<template>
  <main>
    <h1>Welcome to your Language Chatbot!</h1>
    <div class="chatbox">
      <p>This is where the chat interface will go.</p>
      <div class="inputText"></div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
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
  flex-direction: columns;
  align-items: center;
}
</style>
