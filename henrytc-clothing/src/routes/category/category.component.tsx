import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/categories.selector';

import './category.style.scss';

type CategorRouteParams = {
  category: string;
};

const Category = () => {
  const { category } = useParams<
    keyof CategorRouteParams
  >() as CategorRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const categoriesIsLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className='category-page-title'>{category.toUpperCase()}</h2>
      {categoriesIsLoading ? (
        <Spinner />
      ) : (
        <div className='category-container'>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default Category;
