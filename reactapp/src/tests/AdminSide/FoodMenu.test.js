import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FoodMenu from '../../components/Admin/FoodMenu/FoodMenu';
import { MemoryRouter } from 'react-router';

describe('FoodMenu Page', () => {
  test('fe_react_adminFoodMenu', () => {
    render(<MemoryRouter><FoodMenu /></MemoryRouter>);

    const addFoodMenu = screen.getByTestId('addFoodMenu');
    const foodName = screen.getByTestId('foodName');

    expect(addFoodMenu).toBeTruthy();
    expect(foodName).toBeTruthy();
  });
});