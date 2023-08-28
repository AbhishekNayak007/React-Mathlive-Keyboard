import React, { useState, useEffect, useRef } from "react";
import "mathlive";

const App = () => {
  const [latex, setLatex] = useState(null);
  const mathFieldRef = useRef();

  useEffect(() => {
    mathFieldRef.current.mathVirtualKeyboardPolicy = "manual";
    mathFieldRef.current.addEventListener("focusin", (evt) =>
      window.mathVirtualKeyboard.show()
    );
    mathFieldRef.current.addEventListener("focusout", (evt) =>
      window.mathVirtualKeyboard.hide()
    );

    mathFieldRef.current.macros = {
      ...mathFieldRef.current.macros,
      speed: "\\mathrm{speed}",
      abc: "\\mathrm{abc}",
      j1: "\\mathrm{j1}",
    };

    window.mathVirtualKeyboard.layouts = [
      {
        label: "Var",
        rows: [
          [
            { latex: "j1", insert: "\\j1" },
            { latex: "speed", insert: "\\speed" },
            { latex: "abc", insert: "\\abc" },
            { label: "[return]", width: 1 },
            { label: "[backspace]", width: 1 },
          ],
        ],
      },
    ];
  }, []);

  return (
    <div className="App">
      <h1>MathLive with Compute Engine</h1>
      <math-field
        style={{ width: "300px" }}
        ref={mathFieldRef}
        onInput={(evt) => {
          console.log(window.mathVirtualKeyboard.layouts);
          setLatex(evt.target.value);
        }}
      >
        {latex}
      </math-field>
      <p>Latex Expression: {latex}</p>
    </div>
  );
};

export default App;
