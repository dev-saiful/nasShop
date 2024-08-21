import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function Search() {
  const navigate = useNavigate()
  const {keyword: urlKeyword} = useParams()
  const [keyword, setKeyword] = useState(urlKeyword || '')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    }
    else{
      navigate('/')
    }
    setKeyword('')
  }

  return (
    <form onSubmit={submitHandler} className="flex gap-1">
        <input className=" outline-none rounded-2xl px-2 py-1 border-solid border sm:w-80 sm:px-3 sm:py-3 sm:rounded-3xl" type="text" name="q" placeholder='Search here...' id="q" onChange={(e)=> setKeyword(e.target.value)} value={keyword} />
        {/* <button type="submit">Search</button> */}
    </form>
  )
}
