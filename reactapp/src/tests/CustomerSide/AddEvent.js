import { queryByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import AddEvent from '../../components/Customer/AddEvent/AddEvent';


describe('AddEvent Component', () => {
    
    render(<MemoryRouter><AddEvent /></MemoryRouter>)

    test('fe_react_customerAddEvent', () => {
       const  eventName = screen.queryByTestId('eventName');
       const  date = screen.queryByTestId('date');
       const  mobileNumber = screen.queryByTestId('mobileNumber');
       const  emailId = screen.queryByTestId('emailId');
       const  address = screen.queryByTestId('address');

       expect(eventName).toBeTruthy();
       expect(date).toBeTruthy();
       expect(mobileNumber).toBeTruthy();
       expect(emailId).toBeTruthy();
       expect(address).toBeTruthy();
    })
})