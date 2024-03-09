import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../../Components/LoginForm/LoginPage';

describe('LoginPage', () => {
  it('renders login form with correct inputs and buttons', () => {
    render(<LoginPage />);
    
    // Check if the login form heading is rendered
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();

    // Check if the Username input is rendered
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();

    // Check if the Password input is rendered
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

    // Check if the "Forgot Password?" link is rendered
    expect(screen.getByText('Forgot Password ?')).toBeInTheDocument();

    // Check if the Login button is rendered
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('renders flag image', () => {
    render(<LoginPage />);

    // Check if the flag image is rendered
    const flagImage = screen.getByAltText('Flag');
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveClass('flag-image'); // Check if it has the correct class
  });
});