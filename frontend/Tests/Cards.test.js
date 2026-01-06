import { render, screen, waitFor } from '@testing-library/react';
import Cards from '../src/composants/card/Cards';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mocking global fetch
globalThis.fetch = jest.fn();

// Helper function pour créer un MemoryRouter sans warnings
const renderWithRouter = (component) => {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {component}
    </MemoryRouter>
  );
};

describe('Composant Cards', () => {

  beforeEach(() => {
    fetch.mockClear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('doit afficher correctement la structure complète d\'une carte', async () => {
    const mockData = [
      {
        id: '123',
        title: 'Appartement Test',
        cover: 'http://localhost/images/test.jpg'
      }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    renderWithRouter(<Cards />);

    await waitFor(() => {
      // Vérifie le lien
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/logement/123');

      // Vérifie l'image
      const image = screen.getByAltText('image cover');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'http://localhost/images/test.jpg');

      // Vérifie le titre
      const title = screen.getByText('Appartement Test');
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('H1');
    });
  });

  it('doit gérer plusieurs cartes avec des ids différents', async () => {
    const mockData = [
      {
        id: 'abc123',
        title: 'Carte A',
        cover: 'http://localhost/images/a.jpg'
      },
      {
        id: 'def456',
        title: 'Carte B',
        cover: 'http://localhost/images/b.jpg'
      },
      {
        id: 'ghi789',
        title: 'Carte C',
        cover: 'http://localhost/images/c.jpg'
      }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    renderWithRouter(<Cards />);

    await waitFor(() => {
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(3);
      expect(links[0]).toHaveAttribute('href', '/logement/abc123');
      expect(links[1]).toHaveAttribute('href', '/logement/def456');
      expect(links[2]).toHaveAttribute('href', '/logement/ghi789');
    });
  });

  it('doit afficher un message d\'erreur si l\'API échoue avec une exception', async () => {
    // Simuler une erreur API (erreur réseau)
    fetch.mockRejectedValueOnce(new Error('API Error'));

    renderWithRouter(<Cards />);

    // Attendre que l'erreur se produise et que l'état se mette à jour
    await waitFor(() => {
      // Il n'y a pas de cartes affichées
      const cards = screen.queryAllByRole('link');
      expect(cards).toHaveLength(0);
      // Vérifier qu'une erreur est bien loggée dans la console
      expect(console.error).toHaveBeenCalledWith("Erreur lors de la récupération des cartes:", expect.any(Error));
    });
  });

  it('doit gérer le cas où response.ok est false', async () => {
    // Simuler une réponse HTTP avec un statut d'erreur (404, 500, etc.)
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    renderWithRouter(<Cards />);

    // Attendre que l'erreur soit gérée
    await waitFor(() => {
      // Aucune carte ne devrait être affichée
      const cards = screen.queryAllByRole('link');
      expect(cards).toHaveLength(0);
      
      // Vérifier que l'erreur réseau est bien loggée
      expect(console.error).toHaveBeenCalledWith(
        "Erreur lors de la récupération des cartes:", 
        expect.objectContaining({
          message: 'Erreur réseau lors de la récupération des cartes'
        })
      );
    });
  });

});
