import logo from "./logo.svg";
import "./App.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import quizData from "./data/data.json";
import { useState } from "react";

function App() {
  const [questionid, setQuestionid] = useState(0);
  const [quiz, setQuiz] = useState(quizData);
  const [date, setDate] = useState("");
  const [experienceText, setExperienceText] = useState("");

  const backHandler = () => {
    if (questionid > 0) {
      setQuestionid(questionid - 1);
    }
  };

  const nextHandler = () => {
    if (questionid >= 0) {
      setQuestionid(questionid + 1);
    }
  };

  const radioButtonHandler = (e, index) => {
    let updatedData = quiz;

    updatedData[questionid].questionoption.map(function (x) {
      x.selected = false;
    });

    updatedData[questionid].questionoption[index].selected = true;

    setQuiz((prevState) => {
      return {
        ...prevState,
        updatedData,
      };
    });
  };

  const checkboxButtonHandler = (e, index) => {
    // console.log(e.target.checked);
    let updatedData = quiz;

    updatedData[questionid].questionoption[index].selected = e.target.checked;

    setQuiz((prevState) => {
      return {
        ...prevState,
        updatedData,
      };
    });
  };

  const experienceHandler = (e) => {
    setExperienceText(e.target.value);
  };

  const filterFinalData = (data) => {
    return data.filter((option) => option.selected === true);
  };

  // console.log({filterFinalData(quiz[0].questionoption)});

  return (
    <div className="App">
      {questionid < 6 ? (
        <div className="quiz_main_container">
          <div className="quiz_back_conatiner">
            <IoMdArrowRoundBack className="backButton" onClick={backHandler} />
          </div>
          <div className="quiz_content_conatiner">
            <div className="quiz_title_container">
              <p>{quiz[questionid].question}</p>
            </div>

            <div className="questions_conatiner">
              {quiz[questionid].questiontype === "Radio"
                ? quiz[questionid].questionoption.map((options, index) => (
                    <div className="form_group" key={index}>
                      <input
                        type="radio"
                        id={options.optionvalue}
                        name="Radio"
                        checked={options.selected}
                        onChange={(e) => {
                          radioButtonHandler(e, index);
                        }}
                      />
                      <label htmlFor="Radio">{options.optionvalue}</label>
                    </div>
                  ))
                : null}

              {quiz[questionid].questiontype === "Date" ? (
                <input
                  type="date"
                  style={{ padding: "10px" }}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  value={date}
                />
              ) : null}

              {quiz[questionid].questiontype === "Textarea" ? (
                <textarea
                  name="textarea"
                  id="text"
                  cols="30"
                  rows="10"
                  style={{ padding: "10px" }}
                  value={experienceText}
                  onChange={(e) => {
                    experienceHandler(e);
                  }}
                ></textarea>
              ) : null}

              {quiz[questionid].questiontype === "Checkbox"
                ? quiz[questionid].questionoption.map((options, index) => (
                    <div className="form_group" key={index}>
                      <input
                        type="checkbox"
                        id={options.optionvalue}
                        name="Radio"
                        checked={options.selected}
                        onChange={(e) => {
                          checkboxButtonHandler(e, index);
                        }}
                      />
                      <label htmlFor="html">{options.optionvalue}</label>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="quiz_next_conatiner">
            <button className="nextButton" onClick={nextHandler}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="final_form_data_container">
          {filterFinalData(quiz[0].questionoption).map((options) => (
            <h5>1) {options.optionvalue}</h5>
          ))}
          {filterFinalData(quiz[1].questionoption).map((options) => (
            <h5>2) {options.optionvalue}</h5>
          ))}
          <h5>3) {date}</h5>
          {filterFinalData(quiz[3].questionoption).map((options) => (
            <h5>4) {options.optionvalue}</h5>
          ))}
          <h5>5) {experienceText}</h5>
          {filterFinalData(quiz[5].questionoption).map((options) => (
            <h5> 6) {options.optionvalue}</h5>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
