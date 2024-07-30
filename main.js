const BUTTONS = [
  { id: "clear", label: "AC", value: "AC", className: "button span-two" },
  { id: "divide", label: "/", value: "/", className: "button" },
  { id: "multiply", label: "x", value: "*", className: "button" },
  { id: "seven", label: "7", value: "7", className: "button" },
  { id: "eight", label: "8", value: "8", className: "button" },
  { id: "nine", label: "9", value: "9", className: "button" },
  { id: "subtract", label: "-", value: "-", className: "button" },
  { id: "four", label: "4", value: "4", className: "button" },
  { id: "five", label: "5", value: "5", className: "button" },
  { id: "six", label: "6", value: "6", className: "button" },
  { id: "add", label: "+", value: "+", className: "button" },
  { id: "one", label: "1", value: "1", className: "button" },
  { id: "two", label: "2", value: "2", className: "button" },
  { id: "three", label: "3", value: "3", className: "button" },
  { id: "equals", label: "=", value: "=", className: "button span-two" },
  { id: "zero", label: "0", value: "0", className: "button span-two" },
  { id: "decimal", label: ".", value: ".", className: "button" },
];

function App() {
  const [display, setDisplay] = React.useState("0");
  const [formula, setFormula] = React.useState("");
  const [isEvaluated, setIsEvaluated] = React.useState(false);

  const handleClick = (value) => {
    if (value === "AC") {
      setDisplay("0");
      setFormula("");
      setIsEvaluated(false);
    } else if (value === "=") {
      try {
        const result = eval(formula.replace(/--/g, "+")); // Handle double negative
        setDisplay(result.toString());
        setFormula(formula + "=" + result);
        setIsEvaluated(true);
      } catch (e) {
        setDisplay("Error");
        setFormula("");
      }
    } else {
      if (isEvaluated) {
        if (/[0-9.]/.test(value)) {
          setFormula(value);
          setDisplay(value);
        } else {
          setFormula(display + value);
          setDisplay(value);
        }
        setIsEvaluated(false);
      } else {
        if (value === ".") {
          if (!display.includes(".")) {
            setDisplay(display + value);
            setFormula(formula + value);
          }
        } else if (/[0-9]/.test(value)) {
          const newDisplay =
            display === "0" || /[/*+-]/.test(display) ? value : display + value;
          setDisplay(newDisplay);
          setFormula(formula + value);
        } else if (/[/*+-]/.test(value)) {
          if (/[/*+-]$/.test(formula)) {
            if (value === "-") {
              setFormula(formula + value);
              setDisplay(value);
            } else {
              const newFormula = formula.replace(/[/*+-]+$/, "") + value;
              setFormula(newFormula);
              setDisplay(value);
            }
          } else {
            setFormula(formula + value);
            setDisplay(value);
          }
        }
      }
    }
  };

  return (
    <div id="calculator">
      <div id="display" className="text-center">
        {display}
      </div>
      <div id="buttons">
        {BUTTONS.map((button) => (
          <button
            key={button.id}
            id={button.id}
            className={button.className}
            onClick={() => handleClick(button.value)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
