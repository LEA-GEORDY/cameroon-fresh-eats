import orangeMangoImg from "@/assets/products/orange-mango.jpg";
import greenDetoxImg from "@/assets/products/green-detox.jpg";
import tropicalBlendImg from "@/assets/products/tropical-blend.jpg";
import berryBlastImg from "@/assets/products/berry-blast.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  sellerId: string;
  sellerName: string;
  category: string;
  ingredients: string[];
  benefits: string[];
  volume: string;
  isNew?: boolean;
  isBio?: boolean;
  inStock: boolean;
  stockCount: number;
}

export interface Seller {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  productCount: number;
  verified: boolean;
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Orange Mangue Passion",
    description: "Un mélange tropical d'oranges fraîches et de mangues mûres du Cameroun.",
    longDescription: "Découvrez l'explosion de saveurs tropicales avec notre jus Orange Mangue Passion. Préparé avec des oranges fraîchement pressées et des mangues mûres cueillies dans les vergers du Cameroun. Sans sucres ajoutés, sans conservateurs - juste la nature pure dans votre verre.",
    price: 2500,
    image: orangeMangoImg,
    images: [orangeMangoImg],
    rating: 4.8,
    reviews: 124,
    sellerId: "seller1",
    sellerName: "Fruits du Soleil",
    category: "Jus de Fruits",
    ingredients: ["Orange", "Mangue", "Fruit de la passion"],
    benefits: ["Riche en Vitamine C", "Boost d'énergie naturel", "Antioxydants"],
    volume: "500ml",
    isNew: true,
    isBio: true,
    inStock: true,
    stockCount: 50,
  },
  {
    id: "2",
    name: "Détox Vert Énergie",
    description: "Smoothie vert purifiant aux épinards, concombre et citron vert.",
    longDescription: "Notre Détox Vert Énergie est le partenaire parfait pour commencer votre journée. Ce smoothie vert purifiant combine des épinards frais, du concombre croquant, du citron vert et une touche de pomme verte pour un boost de vitalité incomparable.",
    price: 3000,
    image: greenDetoxImg,
    images: [greenDetoxImg],
    rating: 4.6,
    reviews: 89,
    sellerId: "seller2",
    sellerName: "Bio Nature Plus",
    category: "Smoothies",
    ingredients: ["Épinard", "Concombre", "Citron vert", "Pomme verte", "Céleri"],
    benefits: ["Détoxifiant", "Faible en calories", "Riche en fibres", "Énergie naturelle"],
    volume: "400ml",
    isBio: true,
    inStock: true,
    stockCount: 35,
  },
  {
    id: "3",
    name: "Tropical Paradise",
    description: "L'évasion tropicale : ananas, noix de coco et fruit de la passion.",
    longDescription: "Fermez les yeux et laissez-vous transporter sur une plage tropicale avec notre Tropical Paradise. Un mélange exotique d'ananas sucré, de noix de coco crémeuse et de fruit de la passion acidulé qui vous fera voyager à chaque gorgée.",
    price: 2800,
    image: tropicalBlendImg,
    images: [tropicalBlendImg],
    rating: 4.9,
    reviews: 156,
    sellerId: "seller1",
    sellerName: "Fruits du Soleil",
    category: "Jus de Fruits",
    ingredients: ["Ananas", "Noix de coco", "Fruit de la passion", "Papaye"],
    benefits: ["Boost immunitaire", "Hydratant", "Vitamines B", "Minéraux essentiels"],
    volume: "500ml",
    isNew: true,
    isBio: true,
    inStock: true,
    stockCount: 42,
  },
  {
    id: "4",
    name: "Berry Explosion",
    description: "Un concentré de baies rouges : fraises, myrtilles et framboises.",
    longDescription: "Notre Berry Explosion est une symphonie de baies rouges soigneusement sélectionnées. Fraises juteuses, myrtilles sauvages et framboises fraîches se combinent pour créer une expérience gustative intense et satisfaisante.",
    price: 3200,
    image: berryBlastImg,
    images: [berryBlastImg],
    rating: 4.7,
    reviews: 98,
    sellerId: "seller3",
    sellerName: "Saveurs d'Afrique",
    category: "Smoothies",
    ingredients: ["Fraise", "Myrtille", "Framboise", "Mûre"],
    benefits: ["Antioxydants puissants", "Anti-inflammatoire", "Santé cardiaque"],
    volume: "400ml",
    isBio: true,
    inStock: true,
    stockCount: 28,
  },
];

export const sellers: Seller[] = [
  {
    id: "seller1",
    name: "Fruits du Soleil",
    description: "Producteur local de jus naturels depuis 2018. Spécialisé dans les fruits tropicaux du Cameroun.",
    location: "Douala, Cameroun",
    rating: 4.8,
    productCount: 12,
    verified: true,
    image: "/placeholder.svg",
  },
  {
    id: "seller2",
    name: "Bio Nature Plus",
    description: "Agriculture biologique et smoothies détox. Certification bio garantie.",
    location: "Yaoundé, Cameroun",
    rating: 4.6,
    productCount: 8,
    verified: true,
    image: "/placeholder.svg",
  },
  {
    id: "seller3",
    name: "Saveurs d'Afrique",
    description: "Mélanges uniques inspirés des traditions africaines. Goûts authentiques.",
    location: "Bafoussam, Cameroun",
    rating: 4.7,
    productCount: 15,
    verified: true,
    image: "/placeholder.svg",
  },
];

export const categories = [
  { id: "all", name: "Tous", icon: "🍹" },
  { id: "jus", name: "Jus de Fruits", icon: "🍊" },
  { id: "smoothies", name: "Smoothies", icon: "🥤" },
  { id: "detox", name: "Détox", icon: "🥬" },
  { id: "energy", name: "Énergie", icon: "⚡" },
];
