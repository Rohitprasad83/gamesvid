import { Link } from 'react-router-dom'
import { setCategory } from 'features/categories/categoriesSlice'
import { useDispatch } from 'react-redux'

const HomePageCard = ({ category }) => {
  const { categoryName, img } = category
  const dispatch = useDispatch()

  return (
    <div>
      <Link
        to="/videos"
        className="card card__shadow"
        onClick={() => dispatch(setCategory(category))}>
        <span className="card__text__overlay"> {categoryName}</span>
        <img src={img} alt={categoryName} />
      </Link>
    </div>
  )
}

export { HomePageCard }
