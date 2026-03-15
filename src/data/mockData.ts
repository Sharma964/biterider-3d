export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  priceRange: string;
  featured?: boolean;
}

export interface FoodItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Neon Burger Co.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
    cuisine: "American",
    rating: 4.8,
    deliveryTime: "25-35 min",
    priceRange: "$$",
    featured: true,
  },
  {
    id: "2",
    name: "Tokyo Ramen House",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "30-40 min",
    priceRange: "$$$",
    featured: true,
  },
  {
    id: "3",
    name: "Pizza Paradiso",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop",
    cuisine: "Italian",
    rating: 4.7,
    deliveryTime: "20-30 min",
    priceRange: "$$",
  },
  {
    id: "4",
    name: "Spice Republic",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
    cuisine: "Indian",
    rating: 4.6,
    deliveryTime: "35-45 min",
    priceRange: "$$",
  },
  {
    id: "5",
    name: "Dragon Wok",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&h=400&fit=crop",
    cuisine: "Chinese",
    rating: 4.5,
    deliveryTime: "25-35 min",
    priceRange: "$",
  },
  {
    id: "6",
    name: "Taco Fuego",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop",
    cuisine: "Mexican",
    rating: 4.7,
    deliveryTime: "15-25 min",
    priceRange: "$",
  },
];

export const menuItems: FoodItem[] = [
  // Neon Burger Co.
  { id: "f1", restaurantId: "1", name: "Neon Smash Burger", description: "Double patty, cheddar, caramelized onions, secret sauce", price: 12.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", category: "Burgers" },
  { id: "f2", restaurantId: "1", name: "Truffle Fries", description: "Crispy fries with truffle oil and parmesan", price: 7.99, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop", category: "Sides" },
  { id: "f3", restaurantId: "1", name: "Cyber Shake", description: "Thick vanilla milkshake with caramel drizzle", price: 6.99, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop", category: "Drinks" },
  { id: "f4", restaurantId: "1", name: "BBQ Bacon Burger", description: "Smoky BBQ, crispy bacon, pickles, onion rings", price: 14.99, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop", category: "Burgers" },
  // Tokyo Ramen House
  { id: "f5", restaurantId: "2", name: "Tonkotsu Ramen", description: "Rich pork bone broth, chashu, soft egg, nori", price: 15.99, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop", category: "Ramen" },
  { id: "f6", restaurantId: "2", name: "Spicy Miso Ramen", description: "Fermented miso, chili oil, ground pork, corn", price: 16.99, image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400&h=300&fit=crop", category: "Ramen" },
  { id: "f7", restaurantId: "2", name: "Gyoza (6pc)", description: "Pan-fried pork dumplings with dipping sauce", price: 8.99, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop", category: "Appetizers" },
  // Pizza Paradiso
  { id: "f8", restaurantId: "3", name: "Margherita", description: "San Marzano tomatoes, fresh mozzarella, basil", price: 13.99, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop", category: "Pizza" },
  { id: "f9", restaurantId: "3", name: "Pepperoni Inferno", description: "Spicy pepperoni, mozzarella, chili flakes", price: 15.99, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop", category: "Pizza" },
  // Spice Republic
  { id: "f10", restaurantId: "4", name: "Butter Chicken", description: "Creamy tomato curry with tender chicken", price: 14.99, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop", category: "Mains" },
  { id: "f11", restaurantId: "4", name: "Garlic Naan", description: "Fresh baked naan with garlic butter", price: 3.99, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop", category: "Sides" },
  // Dragon Wok
  { id: "f12", restaurantId: "5", name: "Kung Pao Chicken", description: "Spicy chicken with peanuts and vegetables", price: 13.99, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop", category: "Mains" },
  // Taco Fuego
  { id: "f13", restaurantId: "6", name: "Street Tacos (3pc)", description: "Carne asada, cilantro, onion, salsa verde", price: 10.99, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop", category: "Tacos" },
  { id: "f14", restaurantId: "6", name: "Loaded Nachos", description: "Chips, queso, jalapeños, guacamole, sour cream", price: 11.99, image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop", category: "Sides" },
];
