import { renderComponent, expect } from '../test_helper';
import Menu from '../../src/components/Menu';

describe('Menu', () => {

  it('renders appropriate start button', () => {
    const props = { currentlyPlaying: false };
    const menu = renderComponent(Menu, props);
    expect(menu.find('.start-game')).to.have.descendants('input');
    expect(menu.find('.start-game')).to.have.descendants('button');
  });

  it('renders appropriate end button', () => {
    const props = { currentlyPlaying: true };
    const menu = renderComponent(Menu, props);
    expect(menu.find('.end-game')).to.have.descendants('button');
  });
});
