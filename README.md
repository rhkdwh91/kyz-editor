A library editor for simple react based on Lexical.js.

For example...

₩₩₩
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
  return (
    <div>
      <Editor placeholder={<Placeholder />} onChange={onChange} />
    </div>
  );
};
₩₩₩

Try to use it