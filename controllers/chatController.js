const {
  createEmbedding,
} = require("../services/embeddingService");

const {
  searchDocuments,
} = require("../services/pineconeService");

const {
  generateAnswer,
} = require("../services/openaiService");

const chat = async (req, res) => {
  try {
    const { message } = req.body;

    const vector =
      await createEmbedding(message);

    const docs =
      await searchDocuments(vector);

    const context = docs
      .map((d) => d.metadata.text)
      .join("\n");

    const answer =
      await generateAnswer(
        message,
        context
      );

    res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { chat };