const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const app = express();
const port = 3000;

// const test = require('./test.json');

let prompt = "";
let plannerResponse = "";
// plannerResponse = test;     // TESTE - remover depois

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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





// Rota de exemplo para fornecer dados do planner
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

Por favor, siga esse formato para personalizar o itinerário de viagem do usuário, e não se esqueça: a resposta fornecida por voce deve conter APENAS o json pedido, nada mais, nada menos.`;

    console.log("Prompt formatado:", prompt);

    // Chame a função para enviar o novo prompt ao GPT-3 e obter uma resposta
    await fetchGPT3Response();  // Adicionei "await" aqui

    res.status(200).send('Prompt atualizado e formatado');
});





app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
