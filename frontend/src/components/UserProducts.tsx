import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchProducts, deleteProduct, createProduct, updateProduct } from '@/store/productsSlice';
import { AppDispatch } from '@/store/store';
import { Product } from './types';
import { emptyProduct } from './types';
import "../components/Products.scss";
import ShoppingCartIcon from './ShoppingCartIcon';
import { addToCart } from '@/store/cartSlice';

const UserProducts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const [newProduct, setNewProduct] = useState<emptyProduct>({
    name: '',
    description: '',
    price: 0,
    image: ''
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

 

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product)); // Dispatch the addToCart action with the product ID
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000); // Display the alert message for 20 seconds
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="Products">
      <h1>Products</h1>
      <button className="addButton" onClick={() => setShowForm(!showForm)}>Add Product</button>
      <div className="cards-container">               

        {/* Display each product */}
        {products.map((product) => (
          <div key={product._id} className="card">
            <h2>{product.name}</h2>
            <img src={product.image?.toString()} alt="Description of the image" width={100} height={100} />
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button className="addToCartButton" onClick={() => { handleAddToCart(product); }}>
              <ShoppingCartIcon /> {/* Display the ShoppingCartIcon component */}
            </button>

          </div>
        ))}
      </div>
      {isAddedToCart && <div className="alert">Product added to cart</div>}
    </div>
  );
};

export default UserProducts;


