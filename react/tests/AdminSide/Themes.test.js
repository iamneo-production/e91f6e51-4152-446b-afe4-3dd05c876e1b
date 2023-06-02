import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Themes from '../../components/Admin/Themes/Themes';
import { MemoryRouter } from 'react-router';

describe('Themes', () => {
  test('fe_react_adminThemes', () => {
    render(<MemoryRouter><Themes /></MemoryRouter>);

    const addNewTheme = screen.getByTestId('addNewTheme');
    const themeName = screen.getByTestId('themeName');
    const design = screen.getByTestId('design');

    expect(addNewTheme).toBeTruthy();
    expect(themeName).toBeTruthy();
    expect(design).toBeTruthy();

  });
});