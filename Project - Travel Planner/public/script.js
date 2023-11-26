document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatBox = document.getElementById('chat-box');
    const plannerBox = document.getElementById('planner-box');
    const signinBtn = document.getElementById('signin-btn');

    // Verificar se o usuário está logado ou não
    function checkAuthenticationStatus() {
        fetch('http://localhost:3000/auth/status')
            .then(response => response.json())
            .then(data => {
                const userInfoDiv = document.getElementById('user-info');
                const userEmailSpan = document.getElementById('user-email');
    
                if (data.loggedIn) {
                    // Usuário logado
                    signinBtn.style.display = 'none'; // Esconde o botão de Sign in
                    //userEmailSpan.textContent = data.email; // Mostra o e-mail do usuário
                    userInfoDiv.style.display = 'block'; // Mostra as informações do usuário
                } else {
                    // Usuário não logado
                    signinBtn.style.display = 'block'; // Mostra o botão de Sign in
                    //userEmailSpan.textContent = ''; // Esconde o e-mail do usuário
                    userInfoDiv.style.display = 'none'; // Esconde as informações do usuário
                }
            })
            .catch(error => {
                console.error('Erro ao verificar o status de autenticação:', error);
            });
    }
    
    
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
                <h3>${item.activity}<h3>
                <h4>(${item.time})</h4>
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

    checkAuthenticationStatus();



    
    /* EVENT LISTENERS */

    // Lógica do Sign in
    signinBtn.addEventListener('click', function() {
        // Implementar lógica de autenticação aqui
        // Por exemplo, redirecionar para o endpoint de autenticação do Google no seu backend
        window.location.href = 'http://localhost:3000/auth/google';
    });
        
    // Lógica do chat
    sendBtn.addEventListener('click', function() {
        const message = chatInput.value;
        if (message.trim() === '') return;

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
            updatePlanner();
        })
        .catch(error => console.error('Erro ao enviar a mensagem:', error));

        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);

        chatInput.value = '';
    });
});

