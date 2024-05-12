'use client';

import React, { ChangeEvent, useState } from 'react';

import { Editor, initialState, EditorState } from '../../src';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const App = () => {
  const [editorState, setEditorState] = React.useState<string>(initialState);
  const [title, setTitle] = useState('');
  function onChange(editorState: EditorState) {
    console.log(JSON.stringify(editorState.toJSON()));
    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setEditorState(JSON.stringify(editorStateJSON));
  }
  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <div>
      <input type="text" placeholder="title" onChange={handleChangeText} />
      <Editor
        placeholder={<Placeholder />}
        onChange={onChange}
        initialEditorState={editorState}
        editable={true}
      />
    </div>
  );
};

export default App;
