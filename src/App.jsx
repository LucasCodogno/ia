// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import AiwithText from './components/Main/imput';
import AiwithImage from './components/Main/image';

const Home = () => {
  const [aiWith, setLAiWith] = useState('text');

  const handleAiWith = (value) => {
    setLAiWith(value);
  }

  return (
    <div className="container">
      <div style={{ margin: '30px 0' }}>
        <button
          onClick={() => handleAiWith('text')}
          className={aiWith === 'text' ? 'aiWithActive' : ''}>
          AI with Text
        </button>

        <button
          style={{ marginLeft: '20px' }}
          className={aiWith === 'image' ? 'aiWithActive' : ''}
          onClick={() => handleAiWith('image')}>
          AI with Image
        </button>
      </div>

      {aiWith === 'text' ? <AiwithText /> : <AiwithImage />}
    </div>
  );
};

export default Home;
