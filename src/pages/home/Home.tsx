import { useNavigate } from "react-router";
import Footer from "../../components/footer/Footer";
import { Button } from "../../components/ui/button";

function Home() {
  const navigate = useNavigate()
  return (
    <section className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-amber-500 to-pink-500">
      <div className="text-white flex flex-col items-center gap-8">
        <h1 className="text-5xl font-bold">Welcome to QuizMaster</h1>
        <p className="text-xl">
          Test your knowledge with our exciting quizzes!
        </p>
        <Button onClick={() => navigate('/quiz')}
          variant={"outline"}
          className="text-pink-500 p-5 hover:text-pink-600"
        >
          Start Quiz
        </Button>
      </div>
      <Footer />
    </section>
  );
}

export default Home;
