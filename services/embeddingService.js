const { HfInference } = require("@huggingface/inference");

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const createEmbedding = async (text) => {
  const result = await hf.featureExtraction({
    model: "BAAI/bge-small-en-v1.5",  
    inputs: text,
  });

  if (Array.isArray(result[0])) {
    return result[0];
  }
  return Array.from(result);
};

module.exports = { createEmbedding };