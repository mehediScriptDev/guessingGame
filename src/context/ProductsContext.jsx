import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { GET } from '../services/httpMethods';
import { ENDPOINT } from '../services/httpEndpoint';

const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const controllerRef = useRef(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const resp = await GET(ENDPOINT.PUBLIC.PRODUCTS, undefined, controller.signal);
      const data = resp?.data ?? resp;
      setList(data?.products || []);
      setSuccess(true);
      setError(null);
    } catch (err) {
      if (err.name === 'CanceledError' || err.name === 'AbortError') return;
      setError(err?.response?.data || err?.message || 'Failed to fetch products');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    return () => controllerRef.current?.abort();
  }, [fetchProducts]);

  return (
    <ProductsContext.Provider value={{ list, loading, error, success, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
};

export default ProductsContext;
