import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Keep initialization clean and fallback safe
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function POST(request) {
  console.log("=== BACKEND ROUTE ACTIVATED ===");
  try {
    const { question, studentAnswer, expectedAnswer } = await request.json();
    console.log(`Evaluating Question ID data payload...`);

    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY environment variable.");
      return NextResponse.json({ success: false, error: "API configuration missing" }, { status: 500 });
    }

    const prompt = `You are an expert IT trainer and academic evaluator. Analyze the student's short answer against the expected correct answer.
    
    Question: "${question}"
    Expected Correct Answer Reference: "${expectedAnswer}"
    Student's Submitted Answer: "${studentAnswer}"

    Provide your evaluation strictly in this JSON structure:
    {
      "score": 10,
      "feedback": "Concise 1-2 sentence explanation in Bengali."
    }`;

    // Note: Use standard object properties for options wrapper matching your package install
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: { 
        responseMimeType: "application/json" 
      }
    });

    const responseText = response.text;
    const cleanedData = JSON.parse(responseText);

    return NextResponse.json({ success: true, data: cleanedData });

  } catch (error) {
    console.error("CRASH ENCOUNTERED:", error);
    return NextResponse.json({ success: false, error: "Evaluation processing failed." }, { status: 500 });
  }
}