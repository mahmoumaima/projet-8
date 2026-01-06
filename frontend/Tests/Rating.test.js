import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Rating from '../src/composants/rating/Rating'

// Fonction utilitaire pour récupérer les étoiles remplies et vides
const getFilledStars = () => screen.getAllByRole('img', { name: /picture-/ }).filter(star => star.src.includes('starOn.svg'));
const getEmptyStars = () => screen.getAllByRole('img', { name: /picture-/ }).filter(star => star.src.includes('starOff.svg'));

describe('Composant Rating', () => {

  it('Afficher une note maximale (5)', () => {
    render(<Rating rate={5} />);
    expect(getFilledStars().length).toBe(5); // 5 étoiles remplies
    expect(getEmptyStars().length).toBe(0); // 0 étoiles vides
  });

  it('Afficher une note partielle (3)', () => {
    render(<Rating rate={3} />);
    expect(getFilledStars().length).toBe(3); // 3 étoiles remplies
    expect(getEmptyStars().length).toBe(2); // 2 étoiles vides
  });

  it('Afficher une note nulle (0)', () => {
    render(<Rating rate={0} />);
    expect(getFilledStars().length).toBe(0); // 0 étoiles remplies
    expect(getEmptyStars().length).toBe(5); // 5 étoiles vides
  });

  it('Afficher une note supérieure au maximum (7)', () => {
    render(<Rating rate={7} />);
    expect(getFilledStars().length).toBe(5); // Limité à 5 étoiles remplies
    expect(getEmptyStars().length).toBe(0); // 0 étoiles vides
  });

  it('Afficher une note inférieure au minimum (-3)', () => {
    render(<Rating rate={-3} />);
    expect(getFilledStars().length).toBe(0); // 0 étoiles remplies
    expect(getEmptyStars().length).toBe(5); // 5 étoiles vides
  });

  it('Afficher une note décimale (2.5)', () => {
    render(<Rating rate={2.5} />);
    expect(getFilledStars().length).toBe(3); // 3 étoiles remplies
    expect(getEmptyStars().length).toBe(2); // 2 étoiles vides
  });
});
