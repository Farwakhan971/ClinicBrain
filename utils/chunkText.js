const chunkText = (
  text,
  chunkSize = 1000,
  overlap = 200
) => {
  if (!text) return [];

  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = start + chunkSize;

    chunks.push(
      text.slice(start, end).trim()
    );

    start += chunkSize - overlap;
  }

  return chunks.filter(
    (chunk) => chunk.length > 0
  );
};

module.exports = chunkText; 