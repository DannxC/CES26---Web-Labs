document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatBox = document.getElementById('chat-box');
    const plannerBox = document.getElementById('planner-box');

    function updatePlanner() {
        // Limpa o plannerBox antes de atualizar
        plannerBox.innerHTML = "";

        // Carrega o planner atualizado do backend
        fetch('http://localhost:3000/getPlanner')
        .then(response => response.json())
        .then(data => {
            const { itinerary } = data;
            itinerary.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.innerHTML = `
                    <h3>${item.activity} (${item.time})</h3>
                    <p>Local: ${item.location}</p>
                    <p>Descrição: ${item.description}</p>
                `;
                plannerBox.appendChild(itemDiv);
            });
        })
        .catch(error => {
            console.error('Erro ao atualizar o planner:', error);
        });
    }

    // Carregar o planner inicial do backend
    updatePlanner();

    // Lógica do chat
    sendBtn.addEventListener('click', function() {
        const message = chatInput.value;
        if (message.trim() === '') return;

        // Enviar a mensagem ao backend
        fetch('http://localhost:3000/updatePrompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })  // Envia a mensagem como JSON
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            setTimeout(updatePlanner, 16000);  // Aguarda 16 segundos antes de atualizar
        })
        .catch(error => console.error('Erro ao enviar a mensagem:', error));

        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);

        chatInput.value = '';
    });
});
