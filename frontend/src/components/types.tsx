// types.ts
export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image:string
  }
  export interface emptyProduct {
   
    name: string;
    description: string;
    price: number; image:string
  }
  const initialNewProduct: Product = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    image: ''
  };
  
  // You can define other types or interfaces here as needed
  