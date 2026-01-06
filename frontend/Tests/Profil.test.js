import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profil from '../src/composants/profil/Profil';

describe('Composant Profil', () => {

  const mockName = 'Alexandre Dumas';
  const mockPicture = 'https://example.com/profile.jpg';

  it('doit rendre sans erreur', () => {
    render(<Profil name={mockName} picture={mockPicture} />);
    
    // Vérifie que le nom est affiché
    const nameElement = screen.getByText(mockName);
    expect(nameElement).toBeInTheDocument();
  });

  it('doit afficher le nom dans un h1', () => {
    render(<Profil name={mockName} picture={mockPicture} />);
    
    // Vérifie que le nom est dans un h1
    const nameElement = screen.getByRole('heading', { level: 1 });
    expect(nameElement).toHaveTextContent(mockName);
  });

  it('doit afficher l\'image du profil avec la bonne source', () => {
    render(<Profil name={mockName} picture={mockPicture} />);
    
    // Vérifie que l'image est présente avec la bonne source
    const imageElement = screen.getByAltText('picture');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockPicture);
  });

  it('doit afficher correctement un nom avec prénom et nom', () => {
    const fullName = 'Jean-Michel Dupont';
    render(<Profil name={fullName} picture={mockPicture} />);
    
    expect(screen.getByText(fullName)).toBeInTheDocument();
  });

  it('doit rendre l\'image avec l\'attribut alt correct', () => {
    render(<Profil name={mockName} picture={mockPicture} />);
    
    const imageElement = screen.getByAltText('picture');
    expect(imageElement).toHaveAttribute('alt', 'picture');
  });

  it('doit gérer un nom vide', () => {
    render(<Profil name="" picture={mockPicture} />);
    
    // Vérifie que le h1 existe même si vide
    const nameElement = screen.getByRole('heading', { level: 1 });
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent('');
  });

  it('doit gérer une URL d\'image vide', () => {
    render(<Profil name={mockName} picture="" />);
    
    const imageElement = screen.getByAltText('picture');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', '');
  });

});
