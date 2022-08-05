import { loadSearchWord } from 'actions/post'
import useDebounce from 'hooks/useDebounce'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { ChangeEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SearchPage = () => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 400)
  const dispatch = useAppDispatch()
  const { searchWordList } = useAppSelector((state) => state.post)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    if (debouncedValue.trim() !== '') {
      dispatch(loadSearchWord({ word: debouncedValue }))
    }
  }, [dispatch, debouncedValue])

  const handleSubmit = () => {}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={value} onChange={handleSearch} />
        <button type='submit'>검색</button>
      </form>
      <ul>
        {searchWordList.map((item) => (
          <Link to={`/snack/${item.id}`} key={item.id}>
            <li>{item.name}</li>
            <li>{item.brand}</li>
            <img src={`http://localhost:3065/snackimage/${item.imagesrc}`} alt={item.name} />
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default SearchPage
