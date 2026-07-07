import { render, screen } from '@testing-library/react';

import ReactPortal from './ReactPortal';

describe('Functionality', () => {
  test('Component base should be fully rendered', () => {
    // NOTE:  Portal will render outside of RTL <div> container.
    const { container } = render(
      <ReactPortal wrapperId="modal">
        <div>Dummy Component</div>
      </ReactPortal>
    );

    const componentPortal = screen.getByTestId('react-portal');

    expect(container).toBeEmptyDOMElement();
    expect(componentPortal).toBeInTheDocument();
    expect(componentPortal).toHaveAttribute('id', 'modal');
    expect(componentPortal).toHaveTextContent('Dummy Component');
  });
});
