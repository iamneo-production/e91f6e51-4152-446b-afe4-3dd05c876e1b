import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddOns from '../../components/Admin/AddOns/AddOns';
import { MemoryRouter } from 'react-router';

describe('AddOns Page', () => {
  test('fe_react_adminAddOns', () => {
    render(<MemoryRouter><AddOns /></MemoryRouter>);

    const addAddOns = screen.getByTestId('addAddOns');
    const addOnName = screen.getByTestId('addOnName');

    expect(addAddOns).toBeTruthy();
    expect(addOnName).toBeTruthy();
  });
});