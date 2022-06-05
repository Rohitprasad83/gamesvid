import { Link } from 'react-router-dom'
const HomePageCard = ({ category }) => {
  const { categoryName, img } = category
  return (
    <div>
      <Link to="/videos" className="card card__shadow">
        <span className="card__text__overlay"> {categoryName}</span>
        <img src={img} alt={categoryName} />
      </Link>
    </div>
  )
}

export { HomePageCard }
