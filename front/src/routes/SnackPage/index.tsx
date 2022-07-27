import { loadSnackInfo } from 'actions/post'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SnackPage = () => {
  const params = useParams()
  const snackId = params.id
  const dispatch = useAppDispatch()
  const { snackInfo } = useAppSelector((state) => state.post)

  useEffect(() => {
    dispatch(loadSnackInfo({ id: snackId }))
  }, [dispatch, snackId])

  const ratingArr = snackInfo[0]?.Reviews.map((item) => item.rating)
  let ratingAverage = 0
  if (ratingArr) {
    ratingAverage = Number((ratingArr.reduce((sum, cur) => sum + cur, 0) / ratingArr.length).toFixed(2))
  }

  return (
    <div>
      <ul>
        <li>{isNaN(ratingAverage) ? 0 : ratingAverage}</li>
        {snackInfo.map((item) => (
          <Fragment key={item.id}>
            <li>{item.name}</li>
            <li>{item.brand}</li>
            <li>{item.country}</li>
            <img src={`http://localhost:3065/snackimage/${item.imagesrc}`} alt={item.name} />
          </Fragment>
        ))}
      </ul>
    </div>
  )
}

export default SnackPage
