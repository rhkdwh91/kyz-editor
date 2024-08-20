import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { InsertImagePayload } from './ImagePlugin';
import { INSERT_IMAGE_COMMAND } from './ImagePlugin';

export function FillURL() {
  const srcfile = prompt('Enter the URL of the image:', '');
  return srcfile ?? '';
}

function Divider() {
  return <div className="divider" />;
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
    <>
      {insertImage && (
        <button
          onClick={() => insertImage(setImage)}
          className={'toolbar-item spaced '}
        >
          <span className="text">Insert Image</span>
        </button>
      )}
      <Divider />
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
    </>
  );
}
