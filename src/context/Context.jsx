// import { createContext, useState } from "react";
// import runChat from "../config/gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {
//     const [input, setInput] = useState("");
//     const [recentPrompt, setRecentPrompt] = useState("");
//     const [prevPrompts, setPrevPrompts] = useState([]);
//     const [showResult, setShowResult] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [resultData, setResultData] = useState("");
//     const [selectedImage, setSelectedImage] = useState(null);
// // console.log(selectedImage);
//     const delayPara = (index, nextWord) => {
//         setTimeout(() => {
//             setResultData(prev => prev + nextWord);
//         }, 75 * index);
//     }

//     const newChat = () => {
//         setLoading(false);
//         setShowResult(false);
//     }

//     const onSent = async (prompt) => {
//         setResultData("");
//         setLoading(true);
//         setShowResult(true);
//         let response;
//         let response2;
//         if (prompt) {
//             response = await runChat(prompt);
//             response2 = await runChat(prompt);
//             setRecentPrompt(prompt);
//         } else {
//             setPrevPrompts(prev => [...prev, input, selectedImage]);
//             setRecentPrompt(input, selectedImage);
//             response = await runChat(input);
//             response2 = await runChat( selectedImage);
//             // console.log(selectedImage);
//         }

//         let responseArray = response.split("**");
//         let newResponse = "";
//         for (let i = 0; i < responseArray.length; i++) {
//             if (i === 0 || i % 2 !== 1) {
//                 newResponse += responseArray[i];
//             } else {
//                 newResponse += "<b>" + responseArray[i] + "</b>";
//             }
//         }
//         let newResponse2 = newResponse.split("*").join("</br>");
//         let newResponseArray = newResponse2.split(" ");
//         for (let i = 0; i < newResponseArray.length; i++) {
//             const nextWord = newResponseArray[i];
//             delayPara(i, nextWord + " ");
//         }
//         setLoading(false);
//         setInput("");
//     }

//     const uploadImage = async (file) => {
//         setLoading(true);
//         try {
//             // Cria um objeto FormData
//             const formData = new FormData();
//             formData.append('image', file); // 'image' é o nome do campo esperado pela API

//             // Faz a requisição para o endpoint de upload de imagem
//             const response = await fetch('YOUR_IMAGE_UPLOAD_ENDPOINT', {
//                 method: 'POST',
//                 body: formData,
//             });

//             // Verifica se a resposta foi bem-sucedida
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             // Obtém a resposta do servidor
//             const result = await response.json();
            
//             // Lida com o resultado da resposta (substitua conforme necessário)
//             console.log('Upload successful:', result);

//             // Atualiza o estado ou exibe uma mensagem ao usuário
//             // Exemplo: setResultData(result.message); ou exibir um alerta

//         } catch (error) {
//             console.error('Error uploading image:', error);
//             // Lida com erros, exibe uma mensagem para o usuário, etc.
//             // Exemplo: setResultData('Failed to upload image');
//         } finally {
//             setLoading(false);
//         }
//     }

//     const contextValue = {
//         prevPrompts,
//         setPrevPrompts,
//         onSent,
//         setRecentPrompt,
//         recentPrompt,
//         showResult,
//         loading,
//         resultData,
//         input,
//         setInput,
//         newChat,
//         uploadImage,
//         setSelectedImage,
//         selectedImage,
//     }

//     return (
//         <Context.Provider value={contextValue}>
//             {props.children}
//         </Context.Provider>
//     )
// }

// export default ContextProvider;
