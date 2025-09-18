import Groq from "groq-sdk";

const client = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true, 
});

export async function getGroqResponse(prompt: string) {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant", // rápido e bom p/ frases curtas
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0]?.message?.content || "Erro: resposta vazia";
  } catch (error) {
    console.error("Erro na Groq API:", error);
    return "Ops! A IA ficou sem batom hoje 💄";
  }
}