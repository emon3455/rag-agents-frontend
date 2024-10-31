import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAskQuestionMutation } from "../../redux/features/agent/agentApiSlice";
import { FiSend } from "react-icons/fi";
import { GrPowerCycle } from "react-icons/gr";
import { FaClipboard, FaVolumeUp } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const ShareAgentPage = () => {
  const { id } = useParams(); // Get the agent ID from URL parameters
  const [messages, setMessages] = useState([]); // State to hold messages
  const [input, setInput] = useState(""); // State to hold user input
  const [currentMessage, setCurrentMessage] = useState(""); // State for typing animation
  const [copySuccess, setCopySuccess] = useState(false); // State for clipboard success message
  const messageEndRef = useRef(null); // Ref to scroll to the bottom of the messages
  const [askQuestion, { isLoading }] = useAskQuestionMutation(); // Hook to handle the question API
  const [speechSynthesis] = useState(window.speechSynthesis); // Speech synthesis API
  const [reading, setReading] = useState(false); // State to track if text is being read aloud
  const [regenerateMode, setRegenerateMode] = useState(false); // State to check if regenerating a message

  const sendMessage = async () => {
    if (!input.trim() && !regenerateMode) return;

    const userMessage = { agentId: id, question: input };

    if (!regenerateMode) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }

    try {
      const response = await askQuestion(userMessage).unwrap();
      animateAgentResponse(response.answer, regenerateMode);
      setRegenerateMode(false);
    } catch (error) {
      console.error("Error fetching the agent response:", error);
    }
  };

  const animateAgentResponse = (fullText, isRegeneration = false) => {
    const words = fullText.split(" ");
    let index = 0;
    setCurrentMessage("");

    const typingInterval = setInterval(() => {
      if (index < words.length) {
        setCurrentMessage((prev) =>
          prev ? `${prev} ${words[index]}` : words[index]
        );
        index++;
      } else {
        clearInterval(typingInterval);

        setMessages((prevMessages) => {
          if (isRegeneration) {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1] = {
              text: fullText,
              sender: "agent",
            };
            return updatedMessages;
          }
          return [...prevMessages, { text: fullText, sender: "agent" }];
        });

        setCurrentMessage("");
      }
    }, 50);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleReadOutLoud = (text) => {
    if (reading) {
      speechSynthesis.cancel();
      setReading(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setReading(false);
    speechSynthesis.speak(utterance);
    setReading(true);
  };

  const handleRegenerate = () => {
    const lastUserMessage = messages[messages.length - 2]?.text;
    if (lastUserMessage) {
      setInput(lastUserMessage);
      setRegenerateMode(true);
      sendMessage();
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentMessage]);

  return (
    <div className="w-full mx-auto h-[89vh] flex flex-col justify-between p-5 bg-gray-100 ">
      <div className="flex flex-col overflow-y-auto mb-4 h-full">
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
            <div>
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-gray-200 text-gray-700 w-full max-w-[50%]"
                    : "bg-blue-100 text-gray-900 max-w-[50%]"
                }`}
              >
                {message.sender === "agent" ? (
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                ) : (
                  <span>{message.text}</span>
                )}
              </div>
              {message.sender === "agent" && (
                <div className="flex space-x-4 my-2 justify-end max-w-[50%]">
                  <button
                    onClick={() => handleCopy(message.text)}
                    aria-label="Copy message"
                    className="text-gray-600 hover:text-orange-500"
                  >
                    <FaClipboard />
                  </button>
                  <button
                    onClick={() => handleReadOutLoud(message.text)}
                    aria-label="Read out loud"
                    className={`text-gray-600 hover:text-orange-500 ${
                      reading ? "text-red-500" : ""
                    }`}
                  >
                    <FaVolumeUp />
                  </button>
                  <button
                    onClick={handleRegenerate}
                    aria-label="Regenerate response"
                    className="text-gray-600 hover:text-orange-500"
                  >
                    <GrPowerCycle />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {(isLoading || currentMessage) && (
          <div className="flex justify-start mb-2">
            <img
              src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFpJTIwcm9ib3R8ZW58MHx8MHx8fDA%3D"
              alt="Agent"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="bg-blue-100 p-2 rounded-lg max-w-[50%]">
              <span>{currentMessage || "Thinking..."}</span>
            </div>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>
      <div className="flex items-center relative">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          className="w-full border rounded-lg p-2 focus:outline-none resize-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        />
        <button
          onClick={sendMessage}
          className="absolute right-3 top-2 bottom-2 text-gray-600 hover:text-orange-500 transition-colors"
          aria-label="Send message"
        >
          <FiSend size={24} />
        </button>
      </div>
      {copySuccess && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 p-2 rounded-lg shadow-md">
          Message copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default ShareAgentPage;
