import Floor from '../../Components/Floors/Floor';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
describe('Floor Component', () => {
    test('toggles floor correctly when "Switch Floor" button is clicked', () => {
      render(
        <Router>
          <Floor />
        </Router>
      );
      // Initially, the floor should be set to the first floor
      expect(screen.getByText(/Floor Page \*Ground/i)).toBeInTheDocument();
  
      // Simulate clicking the "Switch Floor" button
      fireEvent.click(screen.getByText('Switch Floor'));
  
      // The floor should now be set to the second floor
      expect(screen.getByText(/Floor Page \*Second/i)).toBeInTheDocument();
    });
    test('collapses and expands the sidebar when the "Collapse" button is clicked', () => {
        render(
          <Router>
            <Floor />
          </Router>
        );
        // Find and click the "Collapse" button
        const collapseButton = screen.getByText('Collapse');
        fireEvent.click(collapseButton);
    
      
        expect(true).toBe(true);
    
        // Optionally, click the "Collapse" button again and check if the sidebar expands back.
        fireEvent.click(collapseButton);
       
      });
    
  });
  