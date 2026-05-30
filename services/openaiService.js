const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(
  process.env.HUGGINGFACE_API_KEY
);

const generateAnswer = async (
  question,
  context
) => {
  const prompt = `
You are ClinicBrain AI.

Rules:
1. Answer ONLY using provided context.
2. Do not make up information.
3. If answer not found say:
"I couldn't find this information in the clinic knowledge base."
4. Give professional medical style responses.

Context:
${context}

Question:
${question}

Answer:
`;

  const response =
    await client.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.2,
    });

  return response.choices[0].message.content;
};

module.exports = {
  generateAnswer,
};