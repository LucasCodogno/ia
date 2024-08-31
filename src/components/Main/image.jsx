// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from './imageHelper';

const AiwithImage = () => {
    const genAI = new GoogleGenerativeAI("AIzaSyA-CN-zVmD7DcPMgru4sS1wDy2kn6ineOI");

    const [image, setImage] = useState('');
    const [imageInlineData, setImageInlineData] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState('');

    /**
     * Generative AI Call to fetch image insights
     */
    async function aiImageRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Modelo atualizado
        try {
            const result = await model.generateContent([
                question,  // A pergunta que você deseja enviar
                imageInlineData // A imagem convertida em base64
            ]);
            const response = await result.response;
            const text = response.text();
            setResponse(text);
        } catch (error) {
            console.error("Erro ao gerar o conteúdo:", error);
            setResponse("Ocorreu um erro ao processar a imagem.");
        }
        setLoading(false);

        // Limpar os campos após a resposta
        setImage('');
        setImageInlineData('');
        setQuestion('');
    }

    const handleClick = () => {
        aiImageRun();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // Convertendo a imagem para base64 para exibir na tela
        getBase64(file)
            .then((result) => {
                setImage(result);
            })
            .catch(e => console.log(e));

        // Gerando a parte inline para o Google Generative AI
        fileToGenerativePart(file).then((image) => {
            setImageInlineData(image);
        });
    }

    // Converte um objeto File para um GoogleGenerativeAI.Part
    async function fileToGenerativePart(file) {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });

        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    }

    return (
        <div>
            <div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input 
                        type='text' 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter your question here"
                        style={{ marginBottom: '20px' }}
                    />
                    
                {image ? <img src={image} style={{ width: '10%',height: "10%", marginTop: 30 }} alt="Preview" /> : <input 
                        type='file' 
                     
                        onChange={(e) => handleImageChange(e)} 
                        value="" // Forçar a limpeza do campo de upload de arquivo
                    />}
                    <button  style={{ marginTop: '20px' }} onClick={() => handleClick()}>Search</button>
                </div>
            </div>

            {loading && !aiResponse
                ? <p style={{ margin: '30px 0' }}>Loading ...</p>
                : <div style={{ margin: '30px 0' }}>
                    <p>{aiResponse}</p>
                  </div>
            }
        </div>
    );
};

export default AiwithImage;
