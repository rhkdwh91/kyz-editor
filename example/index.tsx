import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Editor } from '../.';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const App = () => {
  const [editorState, setEditorState] = React.useState("");
  function onChange(editorState) {
    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setEditorState(editorStateJSON);
  }
  console.log(editorState)
  return (
    <div>
      <Editor placeholder={<Placeholder />} onChange={onChange} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
