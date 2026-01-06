import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../src/composants/footer/Footer';

describe('Composant Footer', () => {

  it('doit afficher le logo du footer', () => {
    render(<Footer />);
    
    // Vérifie que le logo est présent avec le bon alt
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveClass('logo-footer');
  });

  it('doit afficher le texte de copyright correct', () => {
    render(<Footer />);
    
    // Vérifie le texte exact du copyright
    const copyrightText = screen.getByText('© 2020 Kasa. All rights reserved');
    expect(copyrightText).toBeInTheDocument();
    expect(copyrightText.tagName).toBe('P');
  });

});
