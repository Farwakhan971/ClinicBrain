require("dotenv").config();
const fs = require("fs");
const pdf = require("pdf-parse");

const chunkText = require("./utils/chunkText");
const { createEmbedding } = require("./services/embeddingService");
const { index } = require("./services/pineconeService");

async function uploadPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);
    const text = pdfData.text;

    const chunks = chunkText(text, 1000, 200);
    console.log(`Total Chunks: ${chunks.length}`);

    const vectors = [];

    for (let i = 0; i < chunks.length; i++) {
      const embedding = await createEmbedding(chunks[i]);
      console.log(`Chunk ${i+1} embedding length: ${embedding.length}`);

      vectors.push({
        id: `clinic-doc-${i}`,
        values: embedding,
        metadata: {
          text: chunks[i],
          source: "clinic_guidelines.pdf",
        },
      });
    }

   await index.upsert({
  records: vectors,
});
    console.log("PDF Uploaded Successfully");

  } catch (error) {
    console.log(error);
  }
}

uploadPDF("./clinic_guidelines.pdf");