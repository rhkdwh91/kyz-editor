import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Editor } from '../.';
import { EditorState } from 'lexical';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const App = () => {
  const [editorState, setEditorState] = React.useState<null | string>(null);
  function onChange(editorState: EditorState) {
    console.log(JSON.stringify(editorState.toJSON()))
    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setEditorState(JSON.stringify(editorStateJSON));
  }
  console.log(editorState)
  return (
    <div>
      <Editor placeholder={<Placeholder />} onChange={onChange} initialEditorState={editorState ? JSON.parse(editorState) : null} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
