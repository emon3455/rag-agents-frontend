import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAskQuestionMutation } from '../../redux/features/agent/agentApiSlice';

const ConversationPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  
  const [askQuestion, { isLoading }] = useAskQuestionMutation();

  // Handle sending the user's message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      agentId: id,
      question: input,
    };
    console.log(userMessage);
    

    // Add user message to the conversation first
    setMessages([...messages, { text: input, sender: 'user' }]);
    
    // Clear input field
    setInput('');

    try {
      // Send request via RTK Query mutation
      const response = await askQuestion(userMessage).unwrap();

      // Add the agent's response to the conversation
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.answer, sender: 'agent' },
      ]);

    } catch (error) {
      console.error('Error fetching the agent response:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-md h-[500px] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
          >
            {message.sender === 'agent' && (
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg" // Placeholder image
                alt="Agent"
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div
              className={`rounded-lg px-4 py-2 ${
                message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              } max-w-xs`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-2">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg" // Placeholder image
              alt="Agent"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="rounded-lg px-4 py-2 bg-gray-300 text-gray-700 max-w-xs flex items-center">
              <div className="dot-flashing"></div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 border rounded-lg p-2 mr-2 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ConversationPage;
