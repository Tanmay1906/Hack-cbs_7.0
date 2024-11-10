const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const fileInput = document.getElementById("fileInput");
const resetBtn = document.getElementById("resetBtn");

// Function to add a message to the chat
function addMessage(text, sender = 'You', isFile = false, fileType = '', fileUrl = '') {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender === 'You' ? "sender" : "receiver");

  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  let messageContent = `<span class="message-text">${sender}: ${text}</span>`;

  // If it's a file, handle different types of previews
  if (isFile) {
    if (fileType.startsWith('image/')) {
      // Preview image
      messageContent += `<img src="${fileUrl}" alt="${text}" class="file-preview-image">`;
    } else if (fileType === 'application/pdf') {
      // Preview PDF with a view option
      messageContent += `<embed src="${fileUrl}" type="application/pdf" class="file-preview-pdf">
                         <a href="${fileUrl}" target="_blank" class="view-file-link">View PDF</a>`;
    } else {
      // Handle other file types (just show the file name with download option)
      messageContent += `<div class="file-name">${text}</div>
                         <a href="${fileUrl}" target="_blank" class="download-file-link">Download</a>`;
    }
  }

  messageDiv.innerHTML = `
    ${messageContent}
    <span class="message-time">${timestamp}</span>
  `;

  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom

  // Save the message to localStorage
  saveMessages();
}

// Function to save messages to localStorage
function saveMessages() {
  const messages = [];
  const messageElements = chatWindow.querySelectorAll('.message');
  
  messageElements.forEach(message => {
    const text = message.querySelector('.message-text').innerText;
    const sender = message.classList.contains('sender') ? 'You' : 'Other';
    const time = message.querySelector('.message-time').innerText;
    const filePreview = message.querySelector('.file-preview-image') ? message.querySelector('.file-preview-image').src : null;
    const fileName = message.querySelector('.file-name') ? message.querySelector('.file-name').innerText : null;
    
    messages.push({ text, sender, time, filePreview, fileName });
  });
  
  localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// Function to load messages from localStorage
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  messages.forEach(message => {
    addMessage(message.text, message.sender, !!message.filePreview, message.fileName, message.filePreview);
  });
}

// Send text message
sendBtn.addEventListener("click", function() {
  const messageText = chatInput.value;
  if (messageText.trim()) {
    addMessage(messageText);
    chatInput.value = ""; // Clear input
  }
});

// Handle file upload and preview
fileInput.addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (file) {
    const fileName = file.name;
    const fileType = file.type;
    const fileUrl = URL.createObjectURL(file); // Create URL for preview

    // Show file preview in chat
    addMessage(`Shared file: ${fileName}`, 'You', true, fileType, fileUrl);

    // TODO: Implement file upload logic to backend or storage
  }
});

// Reset chat messages and clear localStorage
resetBtn.addEventListener("click", function() {
  localStorage.removeItem('chatMessages'); // Clear messages from localStorage
  chatWindow.innerHTML = ""; // Clear chat window
});

// Load messages when the page loads
window.onload = loadMessages;
    