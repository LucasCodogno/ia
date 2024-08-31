/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";


const AiwithText = () => {
    const genAI = new GoogleGenerativeAI("AIzaSyA-CN-zVmD7DcPMgru4sS1wDy2kn6ineOI");

    const [search, setSearch] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    /**
     * Generative AI Call to fetch text insights
     */
    async function aiTextRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        try {
            const result = await model.generateContent([text]);
            const response = await result.response;
            const textResponse = response.text();
            setResponse(textResponse);
        } catch (error) {
            console.error("Erro ao gerar o conteúdo:", error);
            setResponse("Ocorreu um erro ao processar o texto.");
        }
        setLoading(false);

        setText(''); // Limpar campo de texto
    }

    async function aiRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `random meals related to ${search} category with images and prices`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleClick = () => {
        aiTextRun();
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
            <input 
                type='text' 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Em que posso ajudar..."
                style={{ marginBottom: '20px' }}
            /><button style={{ marginLeft: '20px' }} onClick={() => handleClick()}   disabled={!text}>Pesquisar</button>
            </div>

            {
                loading == true && (aiResponse == '') ?
                    <p style={{ margin: '30px 0' }}>Loading ...</p>
                    :
                    <div style={{ margin: '30px 0' }}>
                        <p>{aiResponse}</p>
                    </div>
            }
        </div>
    );
};

export default AiwithText;