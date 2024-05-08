import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
// Access your API key (see "Set up your API key" above)
const API_KEY = "AIzaSyC-unqSVFMw76nxpAzTSsGID-wSL2UXMXk";
const genAI = new GoogleGenerativeAI(API_KEY);


const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");



async function generate() {
  const signal = "robin";
  resultText.innerText = "Generating...";
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];
  
    const chat = model.startChat({
      safetySettings,
    });
    const userInput = promptInput.value;

  // Construct the prompt using template literals and string interpolation
    const prompt = `Framing is Contextualization or giving a piece of context that serves two purpose within the debate:
    - To enhance and empower your arguments
    - To limit the power of other arguments. 
    This is not inherently argument building rather it is "framing" like painting.
    Framing has 2 components:
    - How the framing(context) looks like.
    - Why the framing(context) is true (reasons)
    - Bottom line + implication in debate. 
    Example 1: Motion: This house will allow torturing terrorists. Framing: millitaries will not torture them often, because the media will use it against them, so this will only happen when it's really necessary.
    Example 2: Motion: This House Will legalize drugs. Framing: people do drugs even it's banned - use worse drug - the number of people won't increase much - but the harms will be lowered significantly.
    You are a world champion debater who is a master in framing. Give a framing for the proposition of the following debate motion using the instructions given above. Debate motion: ${userInput}.`;
    
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    const markdown = marked(text);
    
    resultText.innerHTML = markdown; // Set innerHTML to display formatted text
    console.log(markdown);
    } catch (error) {
      // Handle fetch request errors
      if (signal.aborted) {
        resultText.innerText = "Request aborted.";
      } else {
        console.error("Error:", error);
        resultText.innerText = "Error occurred while generating.";
      }
    }
   }
  

  promptInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      generate();
    }
  });
  generateBtn.addEventListener("click", generate);



