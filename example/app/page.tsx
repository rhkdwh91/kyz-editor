'use client';

import React, { ChangeEvent, useState } from 'react';

import { Editor, initialState, EditorState } from '../../dist';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const TextState = () => {
  const [title, setTitle] = useState('');
  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <input
      type="text"
      placeholder="title"
      value={title}
      onChange={handleChangeText}
    />
  );
};

const App = () => {
  const [editorState, setEditorState] = React.useState<string>(initialState);
  function onChange(editorState: EditorState) {
    console.log(JSON.stringify(editorState.toJSON()));
    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setEditorState(JSON.stringify(editorStateJSON));
  }
  const [title, setTitle] = useState('');
  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={handleChangeText}
      />
      <Editor
        placeholder={<Placeholder />}
        onChange={onChange}
        initialEditorState={editorState}
        editable={true}
      />
    </>
  );
};

export default App;
