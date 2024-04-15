import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Editor } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Editor />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
