import { useNavigate } from 'react-router-dom';

import './directory-item.style.scss';

const DirectoryItem = ({ categoryItem }) => {
  const { imageUrl, title, route } = categoryItem;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <div className='directory-item-container' onClick={onNavigateHandler}>
      <div
        className='background-image'
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className='directory-body-container'>
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
