export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  fabric: string; // tipo de tela forrada a mano
  paper: string;  // especificación del papel ecológico
  inStock: boolean;
  originalPrice?: number;
  discount?: number;
  isConsult?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
