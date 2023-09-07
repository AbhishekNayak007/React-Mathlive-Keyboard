import React, { useState, useEffect, useRef } from "react";
import "mathlive";
import { ComputeEngine } from "@cortex-js/compute-engine";

const App = () => {
  const [latex, setLatex] = useState(null);
  const mathFieldRef = useRef();
  const [evaluatedValue, setEvaluatedValue] = useState(0);

  const computingEngine = new ComputeEngine();
  computingEngine.set({ speed: 10 });

  useEffect(() => {
    let exp = computingEngine.parse(latex);
    setEvaluatedValue(exp?.N().valueOf());
  }, [latex]);

  useEffect(() => {
    mathFieldRef.current.mathVirtualKeyboardPolicy = "manual";
    mathFieldRef.current.addEventListener("focusin", (evt) =>
      window.mathVirtualKeyboard.show()
    );
    mathFieldRef.current.addEventListener("focusout", (evt) =>
      window.mathVirtualKeyboard.hide()
    );

    const nums = ["one", "two", "three", "four", "five", "six", "seven"];
    const axesCount = 7;
    let macrosTempObj = {};

    for (let i = 0; i < axesCount; i++) {
      macrosTempObj = Object.assign(macrosTempObj, {
        [`temp${nums[i]}`]: `\\mathrm{temp${i + 1}}`,
      });
    }

    mathFieldRef.current.macros = {
      ...mathFieldRef.current.macros,
      speed: "\\mathrm{speed}",
      ...macrosTempObj,
    };

    let tempKeys = [];
    for (let i = 0; i < axesCount; i++) {
      tempKeys.push({ latex: `temp${i + 1}`, insert: `\\temp${nums[i]}}` });
    }

    window.mathVirtualKeyboard.layouts = [
      {
        label: "Var",
        rows: [
          [
            { latex: "temp#@", insert: "\\tempone", variants: tempKeys },
            { latex: "speed", insert: "\\speed" },
            { latex: "speed", insert: "\\mathrm{speed}" },
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
      <p>Evaluated Value : {evaluatedValue}</p>
    </div>
  );
};

export default App;
