import Image from "next/image";

const CollectionBox = ({ title, category, thumbnail, link}: { title: string, category: string, thumbnail: string, link: string }) => {
  return (
    <article className="collection-box">
        <Image src={thumbnail} alt={`${title} thumbnail`} width={100} height={100} />
          <h3>{title}</h3>
        <div>
          <p>{category}</p>
          <a href={link} target="_blank" rel="noopener noreferrer">View Media</a>
        </div>
    </article>
  )
}

export default CollectionBox;