import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

/* using redux-saga */
import { fetchCategoriesStart } from '../../store/categories/categories.action';

/* using redux-thunk */
// import { fetchCategoriesStartAsync } from '../../store/categories/categories.action';

import './shop.style.scss';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    /* using redux-saga */
    dispatch(fetchCategoriesStart());

    /* using redux-thunk */
    // dispatch(fetchCategoriesStartAsync());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;
