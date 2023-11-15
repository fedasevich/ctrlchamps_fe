import { fireEvent, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import EnterEmail from 'src/components/enter-email/EnterEmail';

describe('EnterEmail component validation', () => {
  it('should be invalid if it does not match email regex', async () => {
    render(<EnterEmail next={(): void => {}} />);

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const input = screen.getByTestId('enter-email');
    const form = screen.getByTestId('form');

    expect(input).toBeInTheDocument();
    expect(form).toBeInTheDocument();

    await user.type(input, '123');

    fireEvent.submit(form);
    expect(input).toHaveValue('123');

    expect(window.alert).toHaveBeenCalledWith('reset_password.errors.invalid');
  });
});
