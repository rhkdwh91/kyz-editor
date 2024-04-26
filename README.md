A library editor for simple react based on Lexical.js.

For example...

```jsx
import { Editor, EditorState, initialState } from 'kyz-editor';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const App = () => {
  const [editorState, setEditorState] = React.useState<string>(initialState);
  function onChange(editorState: EditorState) {
    console.log(JSON.stringify(editorState.toJSON()))
    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setEditorState(JSON.stringify(editorStateJSON));
  }
  return (
    <div>
      <Editor placeholder={<Placeholder />} onChange={onChange} initialEditorState={editorState} />
    </div>
  );
};
```

Read mode example: 
```jsx
<Editor placeholder={<Placeholder />} onChange={onChange} initialEditorState={editorState} editable={false} />
```

Try to use it
