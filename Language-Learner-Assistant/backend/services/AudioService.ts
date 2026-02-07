import { openAI } from './OpenAIService.ts';

export const textToAudio = async (text:string) : Promise<Buffer<ArrayBuffer>>  => {
    console.log('--- Making speech request to OpenAI ---');
    console.log('Text we will convert to audio: ', text);
    try {
        const audioResponse = await openAI.audio.speech.create({
            model: "gpt-4o-mini-tts", 
            voice: "coral",
            input: text,
            instructions: "Speak in a cheerful and positive tone.",
    });

    const buffer = Buffer.from(await audioResponse.arrayBuffer());
    return buffer;
}   catch (error) {
    throw new Error('Failed to generate audio');
}
}