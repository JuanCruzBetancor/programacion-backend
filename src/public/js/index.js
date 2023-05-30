const socket = io();

const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const outputDiv = document.getElementById('output');
const actionsDiv = document.getElementById('actions');

sendButton.addEventListener('click', () => {
    const username = usernameInput.value;
    const message = messageInput.value;

    socket.emit('chat:message', {
        username,
        message
    });

    messageInput.value = '';
});

socket.on('messages', (data) => {
    actionsDiv.innerHTML = '';
    const chatRender = data.map((msg) => {
        return `<p><strong>${msg.username}: ${msg.message}<strong></p>`;
    }).join(' ');
    outputDiv.innerHTML = chatRender;
});