import React, { useRef, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/react';

interface Message {
  text: string;
  isUser: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');

  const userInputRef = useRef<HTMLIonInputElement>(null);

  const handleUserMessage = () => {
    const enteredInput = userInputRef.current!.value;

    const newMessage: Message = {
      text: `User: ${enteredInput}`,
      isUser: true,
    };
  
    setMessages([...messages, newMessage]);
    setUserInput('');
  
    setTimeout(() => {
      const botMessage: Message = {
        text: `Bot: ${enteredInput}`,
        isUser: false,
      };
  
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 500); // Simulate bot response delay
  };

  return (
    <>
    <IonHeader className='ion-margin-vertical'>
      <IonToolbar className="ion-text-center" color={"primary"}>
        <IonTitle>Chatbot</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <IonList>
        {messages.map((message, index) => (
          <IonItem key={index}>
            <IonLabel className={message.isUser ? 'user' : 'bot'}>
              {message.text}
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
      <IonItem>
        <IonInput
          placeholder="Type your message..."
          value={userInput}
          ref={userInputRef}
          onIonChange={(e) => setUserInput(e.detail.value!)}
        ></IonInput>
        <IonButton onClick={handleUserMessage}>Send</IonButton>
      </IonItem>
    </IonContent>
    </>
  );
};

export default Chatbot;