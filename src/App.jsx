import { useState } from "react";
import Display from "./components/Display";
import Keys from "./components/Keys";
import ThemeKey from "./components/ThemeKey";
import "./App.css";

const nonPrintableChars = ["AC", "Back", "="];
const operators = ["+", "-", "*", "/"];
const themes = ["Light", "Dark"];

function App() {
  // Display
  const [printPrimary, setPrintPrimary] = useState("");
  const [printSecondary, setPrintSecondary] = useState("");
  const [operator, setOperator] = useState("");

  // Flags
  const [negFlag, setNegFlag] = useState(false);
  const [decFlag, setDecFlag] = useState(false);

  // Theme
  const [theme, setTheme] = useState(themes[1]);

  function calculateResult(operator) {
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

    result < 0 && setNegFlag(true);
    return result !== undefined
      ? result.toString().includes(".")
        ? result.toFixed(3)
        : result.toString()
      : undefined;
  }

  function handleClick(keyChar) {
    if (!nonPrintableChars.some((char) => char === keyChar)) {
      if (!isNaN(parseInt(keyChar))) {
        setPrintPrimary((prevPrimary) => `${prevPrimary}${keyChar}`);
      } else if (keyChar === "." && printPrimary !== "" && !decFlag) {
        setPrintPrimary((prevPrimary) => `${prevPrimary}${keyChar}`);
        setDecFlag(true);
      } else if (operators.some((op) => op === keyChar)) {
        if (printPrimary !== "") {
          if (!operators.some((op) => printPrimary.includes(op)) || negFlag) {
            setPrintPrimary((prevPrimary) => `${prevPrimary}${keyChar}`);
            setNegFlag(false);
          } else if (!isNaN(calculateResult(operator))) {
            setPrintPrimary(`${calculateResult(operator)}${keyChar}`);
          }

          setOperator(keyChar);
        } else if (printPrimary === "" && keyChar === "-") {
          setPrintPrimary((prevPrimary) => `${prevPrimary}${keyChar}`);
          setNegFlag(true);
        }

        setDecFlag(false);
      }
    } else if (
      keyChar === nonPrintableChars[2] &&
      !isNaN(calculateResult(operator))
    ) {
      let result = calculateResult(operator);
      setPrintSecondary(`${printPrimary}=`);
      setPrintPrimary(result);
      if (!result.includes(".")) {
        setDecFlag(false);
      }
    } else if (keyChar === nonPrintableChars[1]) {
      if (printPrimary[printPrimary.length - 1] === ".") {
        setDecFlag(false);
      }

      setPrintPrimary((prevPrimary) =>
        prevPrimary.slice(0, prevPrimary.length - 1)
      );
    } else if (keyChar === nonPrintableChars[0]) {
      setPrintPrimary("");
      setPrintSecondary("");
      setNegFlag(false);
      setDecFlag(false);
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
