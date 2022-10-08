import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useDebounce from 'hooks/useDebounce'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { loadSearchWord } from 'actions/post'
import Spiner from 'components/Spiner'
import styles from './search.module.scss'
import { BiSearch } from 'react-icons/bi'

const SearchPage = () => {
  const { searchWordList, loadSearchWordLoading } = useAppSelector((state) => state.post)

  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 400)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (debouncedValue.trim() !== '') {
      dispatch(loadSearchWord({ word: debouncedValue }))
    }
  }, [dispatch, debouncedValue])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className={styles.searchPage}>
      <h2 className={styles.searchTitle}>검색</h2>
      <div className={styles.searchFormWrapper}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input
            type='text'
            value={value}
            onChange={handleSearch}
            placeholder='과자 이름을 검색해보세요'
          />
          <button type='submit' aria-label='search'>
            <BiSearch size={20} />
          </button>
        </form>
      </div>
      {debouncedValue && !searchWordList.length && !loadSearchWordLoading && (
        <div className={styles.noResult}>
          &apos;{debouncedValue}&apos;의 검색 결과가 존재하지 않습니다.
        </div>
      )}
      {loadSearchWordLoading ? (
        <Spiner />
      ) : (
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
      )}
    </div>
  )
}

export default SearchPage
