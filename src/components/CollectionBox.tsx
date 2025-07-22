const CollectionBox = ({ title, category, thumbnail, link}: { title: string, category: string, thumbnail: string, link: string }) => {
  return (
    <article className="collection-box">
        <img src={thumbnail} alt={`${title} thumbnail`} />
          <h3>{title}</h3>
        <div>
          <p>{category}</p>
          <a href={link} target="_blank" rel="noopener noreferrer">View Media</a>
        </div>
    </article>
  )
}

export default CollectionBox;