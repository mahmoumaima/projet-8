import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tags from '../src/composants/tags/Tags';

describe('Composant Tags', () => {
  const mockTags = ['Cozy', 'Canal', 'Paris 10'];

  it('affiche les tags et le bon nombre de tags', () => {
    render(<Tags tags={mockTags} />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(mockTags.length);

    mockTags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('rend une liste vide quand aucun tag n\'est fourni', () => {
    render(<Tags tags={[]} />);

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('rend les tags dans le bon ordre', () => {
    render(<Tags tags={mockTags} />);

    const items = screen.getAllByRole('listitem');
    items.forEach((item, index) => {
      expect(item).toHaveTextContent(mockTags[index]);
    });
  });

  it('rend correctement des tags avec des caractères spéciaux', () => {
    const specialTags = ['Tag-1', 'Tag & More', "Tag's Special"];
    render(<Tags tags={specialTags} />);

    specialTags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });
});
