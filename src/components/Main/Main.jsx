import { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
    const {selectedImage, setSelectedImage, onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

console.log(onSent);
    // Função chamada quando o usuário seleciona um arquivo
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Atualiza o estado com a URL da imagem
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file); // Lê o arquivo como URL de dados
            console.log(input);
        }
    };
    return (
        <div className='main'>  
            <div className='nav'>
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">

                {!showResult
                ?<>
                <div className="greet">
                    <p><span>Hello, Dev.</span></p>
                    <p>How can I help you today..?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Briefly summarize this concept: urban planning</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Brainstorm team bonding activities for our work retreat</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Improve the readability of the following code</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
                </>
                :<div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ?<div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                    }
                </div>
                </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            onChange={(e) => setInput(e.target.value)} 
                            value={input} 
                            type="text"  
                            placeholder='Enter a prompt here'
                        />
                          <input
                              id="file-input"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              style={{ display: '' }}
                          />
                        <div>
                            <img 
                                src={assets.gallery_icon} 
                                alt="Upload" 
                                onClick={() => document.getElementById('file-input').click()}
                                className="my-2"
                            />
                            <img src={assets.mic_icon} alt="" />
                            {input && <img onClick={() => onSent()} src={assets.send_icon} alt="" />}
                        </div>
                    </div>
                    console.log(onSent);
                    {selectedImage && (
                        <div className="image-preview">
                            <img src={selectedImage} alt="Preview" />
                        </div>
                    )}
                    <p className="bottom-info">
                        Gemiini may display inaccurate info, including about people, so double-click its responses. Your privacy and Gemini Apps
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Main;
