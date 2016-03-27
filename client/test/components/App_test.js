import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/App';

describe('App', () => {
  it('renders something', () => {
    const app = renderComponent(App);
    expect(app).to.exist;
  });

  it('has a title', () => {
    const app = renderComponent(App);
    expect(app.find('h1')).to.contain('Tic Tac Toe');
  });
});
