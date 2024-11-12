import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import { crud } from '../resource/api';
import { AppContext } from '../context/AppContext';

const App = () => {
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  const [chats, setChats] = useState([]);
  const { apiClient } = useContext(AppContext);

  useEffect(() => {
    const user = window.prompt('Username: ', 'Anonymous');
    setUsername(user);

    const pusher = new Pusher('1da4f01b08fc160656d4', {
      cluster: 'ap1',
      encrypted: true,
    });

    const channel = pusher.subscribe('chat');
    channel.bind('Message', (data) => {
      setChats((prevChats) => [...prevChats, data]);
      console.log(data)
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  const handleTextChange = (e) => {
    if (e.keyCode === 13) {
      const payload = {
        username,
        message: text,
      };
      apiClient.post(crud.concat('send-message'), payload);
      setText('');
    } else {
      setText(e.target.value);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to React-Pusher Chat</h1>
      </header>
      <section>
        <ChatList chats={chats} />
        <ChatBox
          text={text}
          username={username}
          handleTextChange={handleTextChange}
        />
      </section>
    </div>
  );
};

export default App;
