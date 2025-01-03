import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAskQuestionMutation } from "../../redux/features/agent/agentApiSlice";
import { FiSend } from "react-icons/fi";
import ConversationSidebar from "./ConversationSidebar";
// import { GrPowerCycle } from "react-icons/gr";
import { FaClipboard, FaVolumeUp } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const ConversationPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const messageEndRef = useRef(null);
  const [askQuestion, { isLoading }] = useAskQuestionMutation();
  const [speechSynthesis] = useState(window.speechSynthesis);
  const [reading, setReading] = useState(null);
  const [regenerateMode, setRegenerateMode] = useState(false);

  console.log("messages", messages);

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

  const handleReadOutLoud = (text, index) => {
    console.log("reading ", reading);
    if (reading !== null) {
      speechSynthesis.cancel();
      setReading(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setReading(null);
    speechSynthesis.speak(utterance);
    setReading(index);
  };

  // const handleRegenerate = (index) => {
  //   const lastUserMessage = messages[index - 1]?.text;
  //   if (lastUserMessage) {
  //     setInput(lastUserMessage);
  //     setRegenerateMode(true);
  //     sendMessage();
  //   }
  // };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentMessage]);

  return (
    <div className="md:ml-64">
      <ConversationSidebar widgetId={id} />
      <div className="w-full mx-auto h-screen flex flex-col justify-between p-5 bg-gray-100">
        <div className="flex flex-col overflow-y-auto mb-4 h-full">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex   ${
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
                className={`w-full ${message.sender === "user" && "text-end"} `}
              >
                <div
                  className={`rounded-lg px-4 py-2 mb-2  ${
                    message.sender === "user"
                      ? "bg-gray-200 text-gray-700  max-w-[95%] md:max-w-[40%] inline-block ml-auto "
                      : "bg-blue-100 text-gray-900 max-w-[95%]  md:max-w-[50%]"
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
                      onClick={() => handleReadOutLoud(message.text, index)}
                      aria-label="Read out loud"
                      className={`text-gray-600 hover:text-orange-500 ${
                        reading === index ? "text-red-500" : ""
                      }`}
                    >
                      <FaVolumeUp />
                    </button>
                    {/* <button
                      onClick={() => handleRegenerate(index)}
                      aria-label="Regenerate response"
                      className="text-gray-600 hover:text-orange-500"
                    >
                      <GrPowerCycle />
                    </button> */}
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
    </div>
  );
};

export default ConversationPage;
