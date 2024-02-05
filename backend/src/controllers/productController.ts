import { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product';

// Create
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product: IProduct = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Read
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products: IProduct[] = await Product.find();
    res.status(200).json(products);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Update
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct: IProduct | null = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
