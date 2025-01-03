import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import {
  useAskQuestionMutation,
  useGetAgentByIdQuery,
} from "../../redux/features/agent/agentApiSlice";
import { useParams } from "react-router-dom";
import Loading from "../../utils/CLoading/Loading";
import ReactMarkdown from "react-markdown";

const Widget = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);

  const [askQuestion, { isLoading }] = useAskQuestionMutation();
  const { data: agentData, isLoading: isFetching } = useGetAgentByIdQuery(id);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      question: input,
      agentId: id,
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: "user" },
    ]);
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="w-full mx-auto flex flex-col justify-between h-screen  ">
      <h1 className="bg-black  p-4 text-white font-bold text-lg">
        {agentData?.agent_name}
      </h1>
      <div className="p-5  flex h-full justify-between flex-col">
        <div className=" ">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                } mb-2`}
            >
              <div
                className={`rounded-lg px-4 py-2 ${message.sender === "user"
                    ? "bg-gray-100 text-gray-700 max-w-[70%] md:max-w-[50%]"
                    : "bg-blue-100 text-gray-900 max-w-[70%]  md:max-w-[50%]"
                  }`}
              >
                {message.sender === "agent" ? (
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                ) : (
                  <span>{message.text}</span>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-2">
              <div className="bg-blue-100 text-gray-900 max-w-[70%] rounded-lg px-4 py-2">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messageEndRef} />{" "}
          {/* This is the reference for scrolling */}
        </div>
        <div className="flex items-center relative">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
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
    </div>
  );
};

export default Widget;
