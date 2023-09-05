// Pega o contexto do canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");



// Taxas de atualização
const fps = 60;  // Frames por segundo
const ups = 20;  // Updates por segundo
const drawInterval = 1000 / fps;  // Tempo em ms para cada frame
const updateInterval = 1000 / ups; // Tempo em ms para cada atualização do mousemove

let lastUpdateTime = Date.now();  // Para armazenar o último momento em que o mousemove foi atualizado
let lastDrawTime = Date.now();   // Para armazenar o último momento em que o canvas foi desenhado

// Variáveis avião
let airplaneX = 50;
let airplaneY = 50;
let airplaneWidth = 50;
let airplaneHeight = 20;
let airplaneSpeed = 10;
let airplaneAngle = 0;  // Ângulo atual do avião em radianos
let airplaneAngularSpeed = 0.1;  // Velocidade de rotação do avião em radianos por frame
let airplaneAlive = true;   // Flag para indicar se o avião está vivo
const airplaneImage = new Image();
airplaneImage.src = './assets/airplane.png';
airplaneImage.onload = function() {      // Quando a imagem do avião for carregada
    airplaneWidth = this.width/2;
    airplaneHeight = this.height/2;
};
const explosionImage = new Image();
explosionImage.src = './assets/explosion.png';

// Variáveis míssil
let missileX = 200;
let missileY = 200;
let missileWidth = 20;
let missileHeight = 10;
let missileSpeed = 8;
let missileAngle = 0;  // Ângulo atual do míssil em radianos
let missileAngularSpeed = 0.2;  // Velocidade de rotação do míssil em radianos por frame
let missileFired = false;   // Flag para indicar se o míssil foi disparado
let missileAlive = true;   // Flag para indicar se o avião está vivo
let explosionSounded = false;   // Flag para indicar se o som da explosão já foi tocado
const explosionSound = new Audio('./assets/explosion.mp3');
const missileFiringSound = new Audio('./assets/missile_firing.mp3');
const missileImage = new Image();
missileImage.src = './assets/missile.png';
missileImage.onload = function() {      // Quando a imagem do míssil for carregada
    missileWidth = this.width/2;
    missileHeight = this.height/2;
};

// Variáveis para armazenar a última posição conhecida do mouse
let lastMouseX = airplaneX;
let lastMouseY = airplaneY;



// Desenha o avião
function drawAirplane() {
    ctx.save(); // Salva o contexto atual
    ctx.translate(airplaneX, airplaneY);
    ctx.rotate(airplaneAngle + Math.PI / 2);
    if (airplaneAlive) {
        ctx.drawImage(airplaneImage, -airplaneWidth / 2, -airplaneHeight / 2, airplaneWidth, airplaneHeight);
    } else {
        airplaneWidth = explosionImage.width/2;
        airplaneHeight = explosionImage.height/2;
        ctx.drawImage(explosionImage, -airplaneWidth / 2, -airplaneHeight / 2, airplaneWidth, airplaneHeight);
    }
    ctx.restore();  // Restaura o contexto para o estado antes de salvar
}

// Desenha o míssil
function drawMissile() {
    ctx.save(); // Salva o contexto atual
    ctx.translate(missileX, missileY);
    ctx.rotate(missileAngle + Math.PI / 2);
    if (missileAlive) {
        ctx.drawImage(missileImage, -missileWidth / 2, -missileHeight / 2, missileWidth, missileHeight);
    } else if (!explosionSounded) {
        explosionSound.play();  // Toca o som da explosão
        explosionSounded = true;
    }
    ctx.restore();  // Restaura o contexto para o estado antes de salvar
}

// Função principal para desenhar
function draw() {
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cor de fundo do canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha o avião e o míssil
    drawAirplane();
    drawMissile();
}



// Atualiza a posição do avião com base na posição do cursor do mouse
canvas.addEventListener("mousemove", function (event) {
    const rect = canvas.getBoundingClientRect();
    lastMouseX = event.clientX - rect.left;
    lastMouseY = event.clientY - rect.top;
});

// Previne o menu de contexto padrão de aparecer ao clicar com o botão direito
canvas.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    missileFired = true;
    if (missileAlive) {
        missileFiringSound.play()  // Toca o som do míssil sendo disparado
    }
});



// Função para normalizar um ângulo para o intervalo [-π, π]
function normalizeAngle(angle) {
    while (angle < -Math.PI) angle += 2 * Math.PI;
    while (angle > Math.PI) angle -= 2 * Math.PI;
    return angle;
}

// Atualiza a posição do avião com base na última posição conhecida do mouse
function updateAirplanePosition() {
    if (!airplaneAlive) {
        return
    }

    const dx = lastMouseX - airplaneX;
    const dy = lastMouseY - airplaneY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    airplaneAngle = normalizeAngle(airplaneAngle);
    const targetAngle = normalizeAngle(Math.atan2(dy, dx));
    const angleDifference = normalizeAngle(targetAngle - airplaneAngle);

    // Atualiza variáveis de posição e de ângulo do avião apenas quando ele está suficientemente longe do target.
    if (distance > airplaneSpeed / 10) {
        // Atualiza a posição do avião
        if (distance > airplaneSpeed) {
            airplaneX += airplaneSpeed * Math.cos(airplaneAngle);
            airplaneY += airplaneSpeed * Math.sin(airplaneAngle);
        } else {    // Evita a divisão por zero
            airplaneX += (dx / distance) * Math.cos(airplaneAngle) * distance;
            airplaneY += (dy / distance) * Math.sin(airplaneAngle) * distance;
        }

        // Atualiza o ângulo do avião
        if (Math.abs(angleDifference) > airplaneAngularSpeed) {
            airplaneAngle += airplaneAngularSpeed * Math.sign(angleDifference);
        } else if (Math.abs(angleDifference) > airplaneAngularSpeed / 10) { // Evita a divisão por zero
            airplaneAngle = targetAngle;
        }
    }
}

// Atualiza a posição do míssil com base na última posição conhecida do avião
function updateMissilePosition() {
    // Não atualiza a posição do míssil se ele não foi disparado ou se o avião está morto
    if (!missileFired || !missileAlive) {
        return;
    }

    const dx = airplaneX - missileX;
    const dy = airplaneY - missileY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    missileAngle = normalizeAngle(missileAngle);  // Normaliza o ângulo atual do míssil
    const targetAngle = normalizeAngle(Math.atan2(dy, dx));  // Normaliza o ângulo alvo
    const angleDifference = normalizeAngle(targetAngle - missileAngle);  // Normaliza a diferença de ângulo

    // Atualiza a posição do míssil apenas quando ele está suficientemente longe do target.
    if (distance > airplaneHeight / 1.7) {
        // Atualiza a posição do míssil
        if (distance > missileSpeed) {
            missileX += missileSpeed * Math.cos(missileAngle);
            missileY += missileSpeed * Math.sin(missileAngle);
        } else {  // Evita a divisão por zero
            missileX += (dx / distance) * Math.cos(missileAngle) * distance;
            missileY += (dy / distance) * Math.sin(missileAngle) * distance;
        }

        // Atualiza o ângulo do míssil
        if (Math.abs(angleDifference) > missileAngularSpeed) {
            missileAngle += missileAngularSpeed * Math.sign(angleDifference);
        } else if (Math.abs(angleDifference) > missileAngularSpeed / 10) {
            missileAngle = targetAngle;
        }
    }
    else {
        missileFired = false;
        airplaneAlive = false;
        missileAlive = false;
    }
}


// Função principal para atualizar as variáveis de posição	
function update() {
    const now = Date.now();
    if (now - lastUpdateTime >= updateInterval) {
        console.log("Last mouseX position: " + lastMouseX + "Last mouseY position: " + lastMouseY); // Imprime a última posição conhecida do mouse
        updateAirplanePosition();
        updateMissilePosition();
        lastUpdateTime = now;
    }
}



// Função de Loop
function gameLoop() {
    // Calcula o tempo decorrido desde a última iteração do loop
    const timestamp = Date.now();
    const updateDeltaTime = timestamp - lastUpdateTime;
    const drawDeltaTime = timestamp - lastDrawTime;

    // Atualiza a posição se o tempo decorrido for maior ou igual ao intervalo de atualização
    if (updateDeltaTime >= updateInterval) {
        update();  // Função que atualiza a posição do avião e do míssil
        lastUpdateTime = timestamp;
    }

    // Desenha os elementos na tela se o tempo decorrido for maior ou igual ao intervalo de desenho
    if (drawDeltaTime >= drawInterval) {
        draw();
        lastDrawTime = timestamp;
    }

    // Chama a próxima iteração do loop
    requestAnimationFrame(gameLoop);
}

// Inicia o loop do jogo
requestAnimationFrame(gameLoop);