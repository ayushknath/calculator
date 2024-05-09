import { useState } from "react";
import Display from "./components/Display";
import Keys from "./components/Keys";
import ThemeKey from "./components/ThemeKey";
import "./App.css";

const nonPrintableChars = ["AC", "Back", "="];
const operators = ["+", "-", "*", "/"];
const themes = ["Light", "Dark"];

function App() {
  const [printPrimary, setPrintPrimary] = useState("");
  const [printSecondary, setPrintSecondary] = useState("");
  const [theme, setTheme] = useState(themes[1]);

  function calculateResult() {
    const operator = operators.find((op) => printPrimary.includes(op));
    const num1 = parseFloat(printPrimary.split(operator)[0]);
    const num2 = parseFloat(printPrimary.split(operator)[1]);
    let result;

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
    }

    return result.toString();
  }

  function handleClick(keyChar) {
    if (!nonPrintableChars.some((char) => char === keyChar)) {
      if (!isNaN(parseInt(keyChar))) {
        setPrintPrimary((prevPrimary) => (prevPrimary += keyChar));
      } else if (keyChar === "." && !printPrimary.includes(".")) {
        setPrintPrimary((prevPrimary) => (prevPrimary += keyChar));
      } else {
        if (!operators.some((op) => printPrimary.includes(op))) {
          setPrintPrimary((prevPrimary) => (prevPrimary += keyChar));
        } else {
          if (!isNaN(calculateResult())) {
            setPrintPrimary(calculateResult());
            setPrintPrimary((prevPrimary) => (prevPrimary += keyChar));
          }
        }
      }
    } else if (keyChar === nonPrintableChars[2] && !isNaN(calculateResult())) {
      setPrintSecondary(`${printPrimary}=`);
      setPrintPrimary(calculateResult());
    } else if (keyChar === nonPrintableChars[1]) {
      setPrintPrimary((prevPrimary) =>
        prevPrimary.slice(0, prevPrimary.length - 1)
      );
    } else if (keyChar === nonPrintableChars[0]) {
      setPrintPrimary("");
      setPrintSecondary("");
    }
  }

  function handleTheme(text) {
    setTheme(() => themes.find((t) => t === text));
  }

  return (
    <>
      <div className="theme-toggle absolute top-4 right-[50%] translate-x-[50%] md:top-8 md:translate-x-0 md:right-20 flex items-center gap-2">
        {themes.map((t) => (
          <ThemeKey key={t} text={t} theme={theme} handleTheme={handleTheme} />
        ))}
      </div>

      <div className="chassis rounded-md">
        <Display
          printPrimary={printPrimary}
          printSecondary={printSecondary}
          theme={theme}
        />
        <Keys
          handleClick={handleClick}
          coloredKeys={[...operators, ...nonPrintableChars].filter(
            (char) => char != "="
          )}
        />
      </div>
    </>
  );
}

export default App;
