import { queryByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import MyBookings from '../../components/Customer/HomePage/HomePage';


describe('MyBookings', () => {
    
    render(<MemoryRouter><MyBookings /></MemoryRouter>)

    test('fe_react_customerMyBookings', () => {
       const  eventName = screen.queryByTestId('eventName');
       const  date = screen.queryByTestId('date');
	   
	   expect(eventName).toBeTruthy();
       expect(date).toBeTruthy();
    })

})