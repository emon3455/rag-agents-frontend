import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const handleGetStarted = ()=>{
    navigate("/agent")
  }

  return (
    <main className="">
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold">
            Create your <span className="text-orange-500">large language model</span> <br /> to
            Engage Your Audience
          </h1>
          <p className="mt-4 text-lg">
            Octopi Digital powered AI for People at Scale for Businesses and Creators
          </p>
          <button onClick={handleGetStarted} className="mt-8 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
