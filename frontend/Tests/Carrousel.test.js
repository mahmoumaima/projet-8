import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carrousel from '../src/composants/carousel/Carrousel';

describe('Composant Carrousel', () => {

  const mockImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
  ];

  it('doit rendre sans erreur avec une liste d\'images', () => {
    render(<Carrousel images={mockImages} />);

    // Vérifie que la première image est affichée
    const imageElement = screen.getByAltText('picture-0');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockImages[0]);
  });

  it('doit afficher les boutons de navigation avec plusieurs images', () => {
    render(<Carrousel images={mockImages} />);

    // Vérifie la présence des flèches
    const leftArrow = screen.getByAltText('Flèche gauche');
    const rightArrow = screen.getByAltText('Flèche droite');

    expect(leftArrow).toBeInTheDocument();
    expect(rightArrow).toBeInTheDocument();
  });

  it('ne doit pas afficher les boutons de navigation avec une seule image', () => {
    const singleImage = [mockImages[0]];
    render(<Carrousel images={singleImage} />);

    // Vérifie l'absence des flèches
    const leftArrow = screen.queryByAltText('Flèche gauche');
    const rightArrow = screen.queryByAltText('Flèche droite');

    expect(leftArrow).not.toBeInTheDocument();
    expect(rightArrow).not.toBeInTheDocument();
  });

  it('doit afficher le compteur d\'images', () => {
    render(<Carrousel images={mockImages} />);

    // Vérifie le compteur "1/3"
    const counter = screen.getByText('1/3');
    expect(counter).toBeInTheDocument();
  });

  it('ne doit pas afficher le compteur avec une seule image', () => {
    const singleImage = [mockImages[0]];
    render(<Carrousel images={singleImage} />);

    // Vérifie l'absence du compteur
    const counter = screen.queryByText(/\d+\/\d+/);
    expect(counter).not.toBeInTheDocument();
  });

  it('doit gérer la navigation vers la droite (compteur + boucle)', () => {
    render(<Carrousel images={mockImages} />);

    const rightArrow = screen.getByAltText('Flèche droite');

    // Vérifie le compteur et l'image au départ
    expect(screen.getByText('1/3')).toBeInTheDocument();
    expect(screen.getByAltText('picture-0')).toHaveAttribute('src', mockImages[0]);

    // Clic 1 -> image 2
    fireEvent.click(rightArrow);
    expect(screen.getByText('2/3')).toBeInTheDocument();
    expect(screen.getByAltText('picture-1')).toHaveAttribute('src', mockImages[1]);

    // Clic 2 -> image 3
    fireEvent.click(rightArrow);
    expect(screen.getByText('3/3')).toBeInTheDocument();
    expect(screen.getByAltText('picture-2')).toHaveAttribute('src', mockImages[2]);

    // Clic 3 -> boucle -> retour image 1
    fireEvent.click(rightArrow);
    expect(screen.getByText('1/3')).toBeInTheDocument();
    expect(screen.getByAltText('picture-0')).toHaveAttribute('src', mockImages[0]);
  });

  it('doit boucler à la dernière image au clic sur la flèche gauche depuis la première', () => {
    render(<Carrousel images={mockImages} />);

    const leftArrow = screen.getByAltText('Flèche gauche');

    // Vérifie que nous sommes au départ sur la première image
    expect(screen.getByText('1/3')).toBeInTheDocument();
    expect(screen.getByAltText('picture-0')).toHaveAttribute('src', mockImages[0]);

    // Clic sur flèche gauche -> doit aller à la dernière image
    fireEvent.click(leftArrow);
    expect(screen.getByText('3/3')).toBeInTheDocument();
    expect(screen.getByAltText('picture-2')).toHaveAttribute('src', mockImages[2]);
  });

  it('doit gérer correctement la navigation avec deux images', () => {
    const twoImages = [mockImages[0], mockImages[1]];
    render(<Carrousel images={twoImages} />);

    const rightArrow = screen.getByAltText('Flèche droite');

    // Navigation entre 2 images
    fireEvent.click(rightArrow);
    expect(screen.getByText('2/2')).toBeInTheDocument();

    fireEvent.click(rightArrow);
    expect(screen.getByText('1/2')).toBeInTheDocument();
  });

  it('doit gérer un tableau de 4 images ou plus', () => {
    const fourImages = [
      'https://example.com/img1.jpg',
      'https://example.com/img2.jpg',
      'https://example.com/img3.jpg',
      'https://example.com/img4.jpg'
    ];

    render(<Carrousel images={fourImages} />);

    const rightArrow = screen.getByAltText('Flèche droite');

    // Naviguer à travers toutes les images
    expect(screen.getByText('1/4')).toBeInTheDocument();

    fireEvent.click(rightArrow);
    expect(screen.getByText('2/4')).toBeInTheDocument();

    fireEvent.click(rightArrow);
    expect(screen.getByText('3/4')).toBeInTheDocument();

    fireEvent.click(rightArrow);
    expect(screen.getByText('4/4')).toBeInTheDocument();

    // Boucler au début
    fireEvent.click(rightArrow);
    expect(screen.getByText('1/4')).toBeInTheDocument();
  });

});
