import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const formData = await request.formData();
    const imageData = formData.get('data');
    const imageMimeType = formData.get('mimeType')
    const prompt = formData.get('prompt') as string;

    if (!imageData) {
        return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent([prompt, {
            inlineData:{
                data: imageData,
                mimeType: imageMimeType
            }
        }]);
        const response =  result.response;

        let finalResponse;
        if (response.text().includes("```json")) {
            const cleanedResponse = response.text().replace(/```json|```/g, '');
            finalResponse = cleanedResponse;
        };
        const formattedResponse = JSON.parse(response.text())
        finalResponse = formattedResponse;
        return NextResponse.json({ ...finalResponse });
    } catch (error) {
        console.error("Error analyzing image:", error);
        return NextResponse.json({ error: "Failed to analyze the image." }, { status: 500 });
    }
}
