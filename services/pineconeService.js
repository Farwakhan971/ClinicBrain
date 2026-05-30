const { Pinecone } = require("@pinecone-database/pinecone");

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.index(process.env.PINECONE_INDEX);

const searchDocuments = async (vector) => {
  const result = await index.query({
    vector,
    topK: 5,
    includeMetadata: true,
  });

  return result.matches;
};

module.exports = {
  index,
  searchDocuments,
};