import './directory-item.style.scss';

const DirectoryItem = ({ categoryItem }) => {
  const { imageUrl, title } = categoryItem;
  return (
    <div className='directory-item-container'>
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
