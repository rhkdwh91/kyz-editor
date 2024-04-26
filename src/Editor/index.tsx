/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import * as React from 'react';

import ExampleTheme from './ExampleTheme';
import ToolbarPlugin from '../plugins/ToolbarPlugin';

import "./styles.css";
import { EditorState } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

interface MyOnChangePluginProps {
  onChange: (editorState: EditorState) => void
}

function MyOnChangePlugin({ onChange }: MyOnChangePluginProps) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({editorState}) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}



interface AppProps {
  placeholder: JSX.Element;
  initialEditorState: string | null;
  editable: boolean;
  onChange: (editorState: EditorState) => void
}


export default function App({ placeholder, initialEditorState, editable = true, onChange }: AppProps) {
  return (
    <LexicalComposer initialConfig={{
      namespace: 'React.js Demo',
      nodes: [],
      // Handling of errors during update
      onError(error: Error) {
        throw error;
      },
      // The editor theme
      theme: ExampleTheme,
      editorState: initialEditorState,
      editable,
    }}>
      <div className="editor-container">
        {editable && <ToolbarPlugin />}
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={placeholder}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          {editable && <AutoFocusPlugin />}
          <MyOnChangePlugin onChange={onChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}
