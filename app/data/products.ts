export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  isBestseller: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Noir Élégance",
    description: "Notas amaderadas con un toque de vainilla y ámbar",
    price: 12500,
    image: "/hero-bg.png",
    isBestseller: true,
  },
  {
    id: 2,
    name: "Rosa Imperial",
    description: "Fragancia floral con pétalos de rosa y jazmín",
    price: 9800,
    image: "/hero-bg.png",
    isBestseller: false,
  },
  {
    id: 3,
    name: "Oud Dorado",
    description: "Esencia oriental con oud, sándalo y especias",
    price: 15200,
    image: "/hero-bg.png",
    isBestseller: true,
  },
  {
    id: 4,
    name: "Brisa Marina",
    description: "Frescura cítrica con notas de bergamota y sal marina",
    price: 8500,
    image: "/hero-bg.png",
    isBestseller: false,
  },
  {
    id: 5,
    name: "Vetiver Noche",
    description: "Masculinidad sofisticada con vetiver y cuero",
    price: 11000,
    image: "/hero-bg.png",
    isBestseller: true,
  },
  {
    id: 6,
    name: "Flor de Azahar",
    description: "Delicadeza natural con azahar y musk blanco",
    price: 9200,
    image: "/hero-bg.png",
    isBestseller: false,
  },
];

// aca se cargan los productos que se muestran en la pagina principal.