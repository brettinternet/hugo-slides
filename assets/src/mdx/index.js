import React from "react";
import ReactDOM from "react-dom";
import { Embed } from "mdx-deck";

const rootDiv = document.getElementById("root");
const content = rootDiv.innerText;
console.log("content: ", content);

const App = props => {
  console.log("props: ", props);
  return (
    <div>
      <h2>Slides</h2>
      <Embed src={content} slide={2} />
    </div>
  );
};

ReactDOM.render(<App />, rootDiv);
