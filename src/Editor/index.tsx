/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import ExampleTheme from './ExampleTheme';
import ToolbarPlugin from '../plugins/ToolbarPlugin';

import './styles.css';
import { EditorState } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { ImageNode } from '../nodes/ImageNode';
import ImagesPlugin, {
  InsertImagePayload,
} from '../plugins/ToolbarPlugin/ImagePlugin';
import CodeHighlightPlugin from '../plugins/CodeHighlightPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import ListMaxIndentLevelPlugin from '../plugins/ListMaxIndentLevelPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';

interface MyOnChangePluginProps {
  onChange?: (editorState: EditorState) => void;
}

function MyOnChangePlugin({ onChange }: MyOnChangePluginProps) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      if (onChange) {
        onChange(editorState);
      }
    });
  }, [editor, onChange]);
  return null;
}

interface AppProps {
  placeholder?: JSX.Element;
  initialEditorState: string | null;
  editable?: boolean;
  onChange?: (editorState: EditorState) => void;
  insertImage?: (setImage: (payload: InsertImagePayload) => void) => void;
}

export default function App({
  placeholder,
  initialEditorState,
  editable = true,
  onChange,
  insertImage,
}: AppProps) {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: 'React.js Demo',
        nodes: [
          HeadingNode,
          ListNode,
          ListItemNode,
          QuoteNode,
          CodeNode,
          CodeHighlightNode,
          TableNode,
          TableCellNode,
          TableRowNode,
          AutoLinkNode,
          LinkNode,
          ImageNode,
        ],
        // Handling of errors during update
        onError(error: Error) {
          throw error;
        },
        // The editor theme
        theme: ExampleTheme,
        editorState: initialEditorState,
        editable,
      }}
    >
      <div className="editor-container">
        {editable && <ToolbarPlugin insertImage={insertImage} />}
        <div
          className={editable ? 'editor-inner viewer-inner' : 'viewer-inner'}
        >
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={placeholder ?? <></>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ImagesPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <MyOnChangePlugin onChange={onChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}
