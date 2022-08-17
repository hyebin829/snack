import { loadSearchWord } from 'actions/post'
import useDebounce from 'hooks/useDebounce'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { ChangeEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './search.module.scss'
import { BiSearch } from 'react-icons/bi'

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
      <h2 className={styles.searchTitle}>검색</h2>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type='text'
          value={value}
          onChange={handleSearch}
          placeholder='과자를 검색해보세요'
        />
        <button type='submit'>
          <BiSearch size={20} />
        </button>
      </form>
      <ul>
        {searchWordList.map((item) => (
          <Link to={`/snack/${item.id}`} key={item.id} className={styles.resultItemWrapper}>
            <li className={styles.snackimageWrapper}>
              <img
                src={`http://localhost:3065/snackimage/${item.imagesrc}`}
                alt={item.name}
                className={styles.snackimage}
              />
            </li>
            <li className={styles.snackInfo}>
              <span className={styles.snackName}>{item.name}</span>
              <span className={styles.snackBrand}>{item.brand}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default SearchPage
