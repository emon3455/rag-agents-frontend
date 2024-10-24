import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAskQuestionMutation } from "../../redux/features/agent/agentApiSlice";
import { FiSend } from "react-icons/fi";

const ConversationPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);

  const [askQuestion, { isLoading }] = useAskQuestionMutation();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      agentId: id,
      question: input,
    };

    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    try {
      const response = await askQuestion(userMessage).unwrap();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.answer, sender: "agent" },
      ]);
    } catch (error) {
      console.error("Error fetching the agent response:", error);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded-lg h-[480px] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            {message.sender === "agent" && (
              <img
                src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFpJTIwcm9ib3R8ZW58MHx8MHx8fDA%3D"
                alt="Agent"
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div
              className={`rounded-lg px-4 py-2 ${
                message.sender === "user"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-transparent"
              } max-w-xl`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-2">
            <img
              src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFpJTIwcm9ib3R8ZW58MHx8MHx8fDA%3D"
              alt="Agent"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="flex items-center">
              <p className="animate-pulse">Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messageEndRef} /> {/* This is the reference for scrolling */}
      </div>
      <div className="flex items-center relative">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="resize-none w-full border rounded-lg p-2 focus:outline-none overflow-hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        />
        <button
          onClick={sendMessage}
          className="absolute right-3 top-2 bottom-2 text-gray-600 hover:text-orange-500 transition-colors"
          aria-label="Send message"
        >
          <FiSend size={24} />
        </button>
      </div>
    </div>
  );
};

export default ConversationPage;
