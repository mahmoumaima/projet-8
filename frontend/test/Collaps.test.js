import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Collaps from '../src/composants/collaps/Collaps';

describe('Composant Collaps', () => {

  const mockTitle = 'Description';
  const mockContent = 'Ceci est une description détaillée du logement.';

  it('doit être fermé par défaut', () => {
    render(
      <Collaps title={mockTitle}>
        <p>{mockContent}</p>
      </Collaps>
    );
    
    // Vérifie que l'icône a l'attribut alt "Open"
    const icon = screen.getByAltText('Open');
    expect(icon).toBeInTheDocument();
  });

  it('doit afficher le titre dans un h2', () => {
    render(
      <Collaps title={mockTitle}>
        <p>{mockContent}</p>
      </Collaps>
    );
    
    const titleElement = screen.getByRole('heading', { level: 2 });
    expect(titleElement).toHaveTextContent(mockTitle);
  });

  it('doit fermer le collapse après un second clic', () => {
    render(
      <Collaps title={mockTitle}>
        <p>{mockContent}</p>
      </Collaps>
    );
    
    const header = screen.getByRole('heading', { level: 2 }).closest('div');
    
    // Premier clic - ouvre
    fireEvent.click(header);
    expect(screen.getByAltText('Close')).toBeInTheDocument();
    
    // Second clic - ferme
    fireEvent.click(header);
    expect(screen.getByAltText('Open')).toBeInTheDocument();
  });

  it('doit afficher le contenu children', () => {
    render(
      <Collaps title={mockTitle}>
        <p>{mockContent}</p>
      </Collaps>
    );
    
    // Le contenu doit être dans le DOM même si masqué
    expect(screen.getByText(mockContent)).toBeInTheDocument();
  });

  it('doit accepter du contenu JSX complexe', () => {
    render(
      <Collaps title={mockTitle}>
        <div>
          <p>Premier paragraphe</p>
          <p>Second paragraphe</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </Collaps>
    );
    
    expect(screen.getByText('Premier paragraphe')).toBeInTheDocument();
    expect(screen.getByText('Second paragraphe')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

});
