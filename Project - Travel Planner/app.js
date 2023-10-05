const path = require('path');
const express = require('express');
const { Configuration, OpenAIApi } = require("openai");

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
    apiKey: "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",
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
      "activity": "Sua Atividade",
      "location": "Local",
      "time": "Horário",
      "description": "Descrição da Atividade"
    },
    {
      "activity": "Segunda Atividade",
      "location": "Outro Local",
      "time": "Outro Horário",
      "description": "Outra Descrição"
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
