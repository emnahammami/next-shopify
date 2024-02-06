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
import Cart from './Cart';
import Image from 'next/image';
const products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const [newProduct, setNewProduct] = useState<emptyProduct>({
    name: '',
    description: '',
    price: 0,
    image:''
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showUpdateForm, setShowUpdateForm] = useState<string | null>(null); // State variable to track individual update form visibility
  const [display, setSDisplay] = useState<boolean >(false); // State variable to track individual update form visibility

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDeleteProduct = (productId: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    if (isConfirmed) {
      dispatch(deleteProduct(productId));
    }
  };

 

 
  
  
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createProduct(newProduct));
    setNewProduct({ name: '', description: '', price: 0, image: '' });
    setShowForm(false);
  };
  

  const handleUpdateProduct = ( updatedProduct: Product) => {
    console.log("updated product"+updatedProduct.image)
    dispatch(updateProduct(updatedProduct));
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      image:''
    })
    setShowUpdateForm(null); // Close the update form after submission
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (<div>  {display&&(<Cart/>)}
    <div className="Products">
    
      <h1>Products</h1>
      <button className="addButton" onClick={() => setShowForm(!showForm)}>Add Product</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Product description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Product price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
           <input
            type="text"
            name="image"
            placeholder="Product image"
            value={newProduct.image}
            onChange={handleInputChange}
          />
          <button type="submit">Add Product</button>
        </form>
      )}
<div className="cards-container">
      {/* Afficher chaque produit */}
      {products.map((product) => (
        <div key={product._id} className="card">
          <h2>{product.name}</h2>
          <img src={product.image?.toString()} alt="Description of the image" width={100} height={100} />
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button className="deleteButton" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          <button className="updateButton" onClick={() => setShowUpdateForm(product._id)}>Update</button>
                 {showUpdateForm === product._id && (
          <form
          onSubmit={(event) => {
            event.preventDefault();
            handleUpdateProduct( {
              _id: product._id, // Ajoutez l'ID du produit existant
              name: newProduct.name || product.name,
              description: newProduct.description || product.description,
              price: newProduct.price || product.price,
              image: newProduct.image.toString() ||product.image
            });
          }}
        >
        
              <input
                type="text"
                name="name"
                placeholder="Product name"
                value={ newProduct.name||product.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="description"
                placeholder="Product description"
                value={newProduct.description || product.description}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Product price"
                value={newProduct.price || product.price}
                onChange={handleInputChange}
              />  <input
              type="text"
              name="image"
              placeholder="Product image"
              value={newProduct.image || product.image}
              onChange={handleInputChange}
            />
              <button type="submit">Update Product</button>
            </form>
          )}
        </div>
      ))}
    </div></div>
    </div>  );
};

export default products;