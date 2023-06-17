import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Bookings from '../../components/Admin/Bookings/Bookings';
import { MemoryRouter } from 'react-router';

describe('Bookings Page', () => {
  test('fe_react_adminBookings', () => {
    render(<MemoryRouter><Bookings /></MemoryRouter>);

    const customerName = screen.getByTestId('customerName');
    const eventDate = screen.getByTestId('eventDate');
    const statusButton = screen.getByTestId('statusButton');

    expect(customerName).toBeTruthy();
    expect(eventDate).toBeTruthy();
    expect(statusButton).toBeTruthy();
  });
});