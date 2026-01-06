import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../src/composants/header/Header';

// Helper function pour créer un MemoryRouter sans warnings
const renderWithRouter = (component, initialEntries = ['/']) => {
  return render(
    <MemoryRouter 
      initialEntries={initialEntries}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      {component}
    </MemoryRouter>
  );
};

describe('Composant Header', () => {

  it('doit rendre sans erreur', () => {
    renderWithRouter(<Header />);
    
    // Vérifie que le header contient bien les liens
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('À propos')).toBeInTheDocument();
  });

  it('doit afficher le logo', () => {
    renderWithRouter(<Header />);
    
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveClass('logo');
  });

  it('doit contenir deux liens de navigation', () => {
    renderWithRouter(<Header />);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });

  it('le lien Accueil doit pointer vers "/"', () => {
    renderWithRouter(<Header />);
    
    const accueilLink = screen.getByText('Accueil').closest('a');
    expect(accueilLink).toHaveAttribute('href', '/');
  });

  it('le lien À propos doit pointer vers "/apropos"', () => {
    renderWithRouter(<Header />);
    
    const aproposLink = screen.getByText('À propos').closest('a');
    expect(aproposLink).toHaveAttribute('href', '/apropos');
  });

  it('doit afficher les liens dans une liste ul', () => {
    renderWithRouter(<Header />);
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  it('doit contenir une balise nav', () => {
    const { container } = renderWithRouter(<Header />);
    
    const navElement = container.querySelector('nav');
    expect(navElement).toBeInTheDocument();
  });

  // ✨ NOUVEAUX TESTS POUR COUVRIR LES BRANCHES DES CONDITIONS TERNAIRES

  it('doit appliquer la classe "visited" au lien Accueil quand la route est "/"', () => {
    renderWithRouter(<Header />, ['/']);
    
    const accueilLink = screen.getByText('Accueil');
    // Vérifie que le lien Accueil a une classe (styles.visited)
    expect(accueilLink.className).not.toBe('');
    
    const aproposLink = screen.getByText('À propos');
    // Vérifie que le lien À propos n'a pas de classe (chaîne vide)
    expect(aproposLink.className).toBe('');
  });

  it('doit appliquer la classe "visited" au lien À propos quand la route est "/apropos"', () => {
    renderWithRouter(<Header />, ['/apropos']);
    
    const aproposLink = screen.getByText('À propos');
    // Vérifie que le lien À propos a une classe (styles.visited)
    expect(aproposLink.className).not.toBe('');
    
    const accueilLink = screen.getByText('Accueil');
    // Vérifie que le lien Accueil n'a pas de classe (chaîne vide)
    expect(accueilLink.className).toBe('');
  });

  it('ne doit appliquer aucune classe "visited" quand la route est différente', () => {
    renderWithRouter(<Header />, ['/logement/123']);
    
    const accueilLink = screen.getByText('Accueil');
    const aproposLink = screen.getByText('À propos');
    
    // Les deux liens ne doivent pas avoir de classe visited
    expect(accueilLink.className).toBe('');
    expect(aproposLink.className).toBe('');
  });

});
