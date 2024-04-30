import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import * as React from 'react';

import { InsertImagePayload } from './ImagePlugin';
import { INSERT_IMAGE_COMMAND } from './ImagePlugin';

export function FillURL() {
  const srcfile = prompt('Enter the URL of the image:', '');
  return srcfile ?? '';
}

interface ImageToolbarProps {
  insertImage?: (setImage: (payload: InsertImagePayload) => void) => void;
}

export default function ImageToolbar({
  insertImage,
}: ImageToolbarProps): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const setImage = (payload: InsertImagePayload) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
  };

  return (
    <div className="toolbar">
      {insertImage && (
        <button
          onClick={() => insertImage(setImage)}
          className={'toolbar-item spaced '}
        >
          <span className="text">Insert Image</span>
        </button>
      )}
      <button
        onClick={() =>
          setImage({
            altText: 'URL image',
            src: FillURL(),
          })
        }
        className={'toolbar-item spaced '}
      >
        <span className="text">Insert from URL</span>
      </button>
    </div>
  );
}
