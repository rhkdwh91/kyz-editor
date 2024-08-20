import Editor from './Editor';
import { EditorState } from 'lexical';
import { ImagePayload } from './nodes/ImageNode';

const initialState =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

type setImage = (payload: Readonly<ImagePayload>) => void;

export type { EditorState, setImage };

export { Editor, initialState };
