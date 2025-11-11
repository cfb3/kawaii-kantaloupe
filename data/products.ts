import { Product, PackageProduct, DecorationBlob } from "@/types";

// Blob Sticker Products (For Sale)
export const blobStickers: Product[] = [
  {
    id: "blob-frankenstein",
    name: "Frankenstein Blob",
    description: "Adorable green blob with stitches - perfect for Halloween!",
    price: 3.0,
    category: "blob-sticker",
    image: "/images/products/blob/frankenstein/frankenstein1.jpg",
    inStock: true,
  },
  {
    id: "blob-witch",
    name: "Witch Blob",
    description: "Purple blob wearing a witch hat - spooky and cute!",
    price: 3.0,
    category: "blob-sticker",
    image: "/images/products/blob/witch/witch1.jpg",
    inStock: true,
  },
  {
    id: "blob-pumpkin-patch",
    name: "Pumpkin Patch Blob",
    description: "Sweet farmer blob ready for pumpkin season!",
    price: 3.0,
    category: "blob-sticker",
    image: "/images/products/blob/pumpkin patch/pumkin patch1.jpg",
    inStock: true,
  },
];

// Taba Squishy Products
export const tabaSquishy: Product[] = [
  {
    id: "taba-bird-blue",
    name: "Blue Bird Taba Squishy",
    description: "Adorable blue bird-shaped taba squishy - soft and squishy!",
    price: 3.0,
    category: "taba-squishy",
    image: "/images/products/taba/bird/blue.jpg",
    inStock: true,
  },
  {
    id: "taba-penguin-black",
    name: "Black Penguin Taba Squishy",
    description: "Adorable black penguin taba squishy - waddle into fun!",
    price: 3.0,
    category: "taba-squishy",
    image: "/images/products/taba/penguin/black.jpg",
    inStock: true,
  },
  {
    id: "taba-piggie-pink",
    name: "Pink Piggie Taba Squishy",
    description: "Cute pink piggie taba squishy - oink oink!",
    price: 3.0,
    category: "taba-squishy",
    image: "/images/products/taba/piggie/pink.jpg",
    inStock: true,
  },
  {
    id: "taba-bunny-blue",
    name: "Blue Bunny Taba Squishy",
    description: "Cute blue bunny taba squishy - perfect for squishing!",
    price: 5.0,
    category: "taba-squishy",
    image: "/images/products/taba/bunny/blue.jpg",
    inStock: true,
  },
  {
    id: "taba-bunny-white",
    name: "White Bunny Taba Squishy",
    description: "Cute white bunny taba squishy - perfect for squishing!",
    price: 5.0,
    category: "taba-squishy",
    image: "/images/products/taba/bunny/white.jpg",
    inStock: true,
  },
  {
    id: "taba-capybara-brown",
    name: "Brown Capybara Taba Squishy",
    description: "Chill capybara taba squishy - just vibing!",
    price: 6.0,
    category: "taba-squishy",
    image: "/images/products/taba/capybara/brown.jpg",
    inStock: true,
  },
  {
    id: "taba-jellyfish-pink",
    name: "Pink Jellyfish Taba Squishy",
    description: "Adorable pink jellyfish taba squishy - so squishy!",
    price: 6.0,
    category: "taba-squishy",
    image: "/images/products/taba/jellyfish/pink.jpg",
    inStock: true,
  },
  {
    id: "taba-gummie-bears",
    name: "Gummie Bears Taba Squishy Set",
    description:
      "Three colorful gummie bear taba squishies - collect them all!",
    price: 4.0,
    category: "taba-squishy",
    image: "/images/products/taba/gummie bears/all three.jpg",
    inStock: true,
  },

  {
    id: "taba-paws-set",
    name: "Paws Taba Squishy Set",
    description: "Three colorful paw taba squishies - blue, pink, and yellow!",
    price: 4.0,
    category: "taba-squishy",
    image: "/images/products/taba/paws/all three.jpg",
    images: [
      "/images/products/taba/paws/all three.jpg",
      "/images/products/taba/paws/blue.jpg",
      "/images/products/taba/paws/pink.jpg",
      "/images/products/taba/paws/yellow.jpg",
    ],
    inStock: true,
  },
  {
    id: "taba-paws-blue",
    name: "Blue Paw Taba Squishy",
    description: "Cute blue paw taba squishy - pawsitively adorable!",
    price: 2.0,
    category: "taba-squishy",
    image: "/images/products/taba/paws/blue.jpg",
    inStock: true,
  },
  {
    id: "taba-paws-pink",
    name: "Pink Paw Taba Squishy",
    description: "Cute pink paw taba squishy - pawsitively adorable!",
    price: 2.0,
    category: "taba-squishy",
    image: "/images/products/taba/paws/pink.jpg",
    inStock: true,
  },
  {
    id: "taba-paws-yellow",
    name: "Yellow Paw Taba Squishy",
    description: "Cute yellow paw taba squishy - pawsitively adorable!",
    price: 2.0,
    category: "taba-squishy",
    image: "/images/products/taba/paws/yellow.jpg",
    inStock: true,
  },
];

export const slime: Product[] = [
  {
    id: "slime-avocado-fun",
    name: "Avocado Fun",
    description: "Clay and Jelly slime with avocado charms.",
    price: 7.0,
    category: "slime",
    image: "/images/products/slime/Avocado Fun/IMG_0074.jpeg",
    inStock: true,
    slimeType: "Clay and Jelly",
    smallCharms: ["avocado"],
  },
  {
    id: "slime-blue-lemon",
    name: "Blue Lemon",
    description:
      "Clay slime with blue lemon charms and big blue lemon clay topper.",
    price: 8.0,
    category: "slime",
    image: "/images/products/slime/Blue Lemon/IMG_0076.jpeg",
    inStock: true,
    slimeType: "Clay",
    smallCharms: ["blue lemon"],
    clayToppers: ["big blue lemon"],
  },
  {
    id: "slime-dragons",
    name: "Dragon Fruit",
    description: "Bingsu slime with dragon fruit charms.",
    price: 7.0,
    category: "slime",
    image: "/images/products/slime/Dragons/IMG_0077.jpeg",
    inStock: true,
    slimeType: "Bingsu",
    smallCharms: ["dragon fruit"],
  },
  {
    id: "slime-fruitmash",
    name: "Fruitmash",
    description:
      "Bingsu Clay slime with strawberry, lemon, and blue lemon charms.",
    price: 7.0,
    category: "slime",
    image: "/images/products/slime/Fruitmash/IMG_0078.jpeg",
    inStock: true,
    slimeType: "Bingsu Clay",
    smallCharms: ["strawberries", "lemons", "blue lemons"],
  },
  {
    id: "slime-grapalicous",
    name: "Grapalicous",
    description: "Snow slime with grape charms and grape bunch clay topper.",
    price: 8.0,
    category: "slime",
    image: "/images/products/slime/Grapalicous/IMG_0079.jpeg",
    inStock: true,
    slimeType: "Snow",
    smallCharms: ["grape"],
    clayToppers: ["grape bunch"],
  },
  {
    id: "slime-jurassic-times",
    name: "Jurassic Times",
    description: "Clay slime with dinosaur big charm and apple charms.",
    price: 7.0,
    category: "slime",
    image: "/images/products/slime/Jurassic Times/IMG_0081.jpeg",
    inStock: true,
    slimeType: "Clay",
    bigCharms: ["dinosaur"],
    smallCharms: ["apple"],
  },
  {
    id: "slime-strawberry-lemonade",
    name: "Strawberry Lemonade",
    description: "Bingsu slime with strawberry and lemon charms.",
    price: 7.0,
    category: "slime",
    image: "/images/products/slime/Strawberry Lemonade/IMG_0080.jpeg",
    inStock: true,
    slimeType: "Bingsu",
    smallCharms: ["strawberry", "lemon"],
  },
  {
    id: "slime-strawberry-peppermint",
    name: "Strawberry Peppermint",
    description: "Jelly and Clay slime with strawberry charms.",
    price: 7.0,
    category: "slime",
    image: "/images/products/slime/Strawberry Peppermint/IMG_0075.jpeg",
    inStock: true,
    slimeType: "Jelly and Clay",
    smallCharms: ["strawberry"],
  },
];

// Package Deals
export const packages: PackageProduct[] = [
  {
    id: "package-all-blobs",
    name: "All Blob Stickers Bundle",
    description: "Get all three adorable blob stickers and save!",
    price: 8.0,
    category: "package",
    image: "/images/products/blob/frankenstein/frankenstein1.jpg",
    images: [
      "/images/products/blob/frankenstein/frankenstein1.jpg",
      "/images/products/blob/witch/witch1.jpg",
      "/images/products/blob/pumpkin patch/pumkin patch1.jpg",
    ],
    inStock: true,
    items: ["blob-frankenstein", "blob-witch", "blob-pumpkin-patch"],
    originalPrice: 9.0,
    savings: 1.0,
  },
  {
    id: "package-gummie-bears",
    name: "Gummie Bears Taba Squishy Bundle",
    description: "All three colorful gummie bear taba squishies - save $3!",
    price: 12.0,
    category: "package",
    image: "/images/products/taba/gummie bears/all three.jpg",
    inStock: true,
    items: ["taba-gummie-bears"], // References the set product
    originalPrice: 15.0,
    savings: 3.0,
  },
  {
    id: "package-paws",
    name: "Paws Taba Squishy Bundle",
    description:
      "All three paw taba squishies - blue, pink, and yellow - save $3!",
    price: 12.0,
    category: "package",
    image: "/images/products/taba/paws/all three.jpg",
    images: [
      "/images/products/taba/paws/all three.jpg",
      "/images/products/taba/paws/blue.jpg",
      "/images/products/taba/paws/pink.jpg",
      "/images/products/taba/paws/yellow.jpg",
    ],
    inStock: true,
    items: ["taba-paws-blue", "taba-paws-pink", "taba-paws-yellow"],
    originalPrice: 15.0,
    savings: 3.0,
  },
];

// Decoration Blobs (Not for sale - just for decoration)
export const decorationBlobs: DecorationBlob[] = [
  {
    id: "deco-mummy",
    image: "/images/PXL_20251025_214740995.jpg",
    alt: "Mummy blob decoration",
  },
  {
    id: "deco-chef",
    image: "/images/PXL_20251025_214746869.jpg",
    alt: "Chef blob decoration",
  },
  {
    id: "deco-corn",
    image: "/images/PXL_20251025_214751824.jpg",
    alt: "Corn farmer blob decoration",
  },
];

// All products combined
export const allProducts: Product[] = [
  ...blobStickers,
  ...tabaSquishy,
  ...slime,
  ...packages,
];

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return allProducts.find((product) => product.id === id);
}

// Helper function to get featured products (for home page)
export function getFeaturedProducts(): Product[] {
  // Mix of blob stickers, taba squishies, and slime
  return [
    blobStickers[0], // Frankenstein Blob
    tabaSquishy.find((p) => p.id === "taba-capybara-brown")!,
    slime.find((p) => p.id === "slime-blue-lemon")!, // Blue Lemon with clay topper
    slime.find((p) => p.id === "slime-grapalicous")!, // Grapalicous with clay topper
    blobStickers[1], // Witch Blob
    tabaSquishy.find((p) => p.id === "taba-penguin-black")!,
  ];
}
