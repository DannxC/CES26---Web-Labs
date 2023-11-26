const path = require('path');
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require("openai");
const {OAuth2Client} = require('google-auth-library');

dotenv.config();

const app = express();
const port = 3000;


// Google OAuth2 Client 
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// const test = require('./test.json');
// plannerResponse = test;     // TESTE - remover depois
let prompt = "";
let plannerResponse = "";

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'seu_segredo_aqui', // Uma chave secreta para assinar a sessão ID cookie
    resave: false,              // Força a sessão a ser salva de volta na sessão store
    saveUninitialized: true,    // Força uma sessão não inicializada a ser salva na store
    cookie: { secure: false }   // Se verdadeiro, só envia o cookie sobre HTTPS
    // Nota: Em produção, defina 'secure' como true e forneça outras opções de cookie conforme necessário
}));

// Starting a new session of openai
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function fetchGPT3Response() {
    try {
        const openAIAPIResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-16k",
            messages: [
                {"role": "system", "content": "Você é um assistente de viagens."},
                {"role": "user", "content": prompt},
            ],
            temperature: 0.55,
        });

        const gpt3Response = openAIAPIResponse.data.choices[0].message.content;
        console.log("Resposta do GPT-3:", gpt3Response);


        // Parse the response to JSON object
        // Use JSON.parse only if the response is a string that represents a JSON object
        const parsedResponse = typeof gpt3Response === 'string' ? JSON.parse(gpt3Response) : gpt3Response;

        // Populate it to plannerResponse
        plannerResponse = parsedResponse;
        console.log(plannerResponse)

    } catch (error) {
        console.error("Erro ao buscar a resposta do GPT-3:", error);
        plannerResponse = `
{
    "destination": "--",
    "itinerary": [
        {
        "activity": "--",
        "location": "--",
        "time": "01/01/0001 01:01",
        "description": "No itinerary found. Try again."
        }
    ]
}
        `;
        plannerResponse = JSON.parse(plannerResponse);
    }
}



/* ROUTES */

// Rota para iniciar a Autenticação com o Google
app.get('/auth/google', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
    });
    console.log(url);
    res.redirect(url);
});

// Rotas para callback da Autenticação com o Google
app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);


        // Pegar o email do usuario e salvar na sessao atual (express-session) 
        // // Criar um cliente OAuth2 com os tokens
        // const oauth2 = google.oauth2({
        //     auth: oauth2Client,
        //     version: 'v2'
        // });

        // // Obter as informações do usuário
        // const userInfo = await oauth2.userinfo.get();
        // const userEmail = userInfo.data.email;

        // // Salvar o e-mail do usuário na sessão
        // req.session.user = { email: userEmail };

        // Registrar na sessão que o usuário está logado
        req.session.user = { loggedIn: true };
        //req.session.loggedIn = true;


        res.redirect('/'); // Redirecionar para a página principal ou de sucesso
    } catch (error) {
        console.error('Erro ao trocar o código pelo token:', error);
        res.status(500).send('Erro na Autenticação');
    }
});

// Rota para saber se está logado ou não na conta google
app.get('/auth/status', (req, res) => {
    console.log("Acessando /auth/status");
    console.log("req.session:", req.session);
    try {
        if (req.session.user) {
            // res.json({ loggedIn: true, email: req.session.user.email });
            res.json({ loggedIn: true });
        } else {
            res.json({ loggedIn: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





// Rota GET para fornecer dados do planner
app.get('/getPlanner', (req, res) => {
    const planner = plannerResponse;
    res.json(planner);
});




// Rota POST para receber a mensagem do frontend
app.post('/updatePrompt', async (req, res) => {
    const userMessage = req.body.message;
    prompt = `A mensagem do usuário foi essa: "'${userMessage}'." 

Preciso que, a partir da mensagem acima, você forneça um planner de viagem para o destino mencionado pelo usuário. O planner deverá ter o seguinte formato de exemplo:
\`\`\`json
{
  "destination": "Seu Destino",
  "itinerary": [
    {
      "activity": "Primeira Atividade",
      "location": "Primeiro Local",
      "time": "Dia 1 - HH:MM",
      "description": "Primeira Descrição da Atividade"
    },
    {
      "activity": "Segunda Atividade",
      "location": "Segundo Local",
      "time": "Dia 2 - HH:MM",
      "description": "Segunda Descrição da Atividade"
    }
    // Adicione mais atividades conforme desejar
  ]
}
\`\`\`

Por favor, siga esse formato para personalizar o itinerário de viagem do usuário, e não se esqueça: a resposta fornecida por você deve conter APENAS o JSON pedido, nada mais, nada menos.`;

    console.log("Prompt formatado:", prompt);

    // Chame a função para enviar o novo prompt ao GPT-3 e obter uma resposta
    await fetchGPT3Response();

    res.status(200).send('Prompt atualizado e formatado');
});






app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
