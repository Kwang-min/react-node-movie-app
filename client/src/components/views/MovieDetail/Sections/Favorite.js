import React,{ useEffect, useState } from 'react';
import Axios from 'axios'
import { Button } from 'antd'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber,setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);
    let variables = {
      userFrom, //이거 그냥 이거랑 같음 (userFrom: userFrom) 편할라고 짧게 쓰는 것
      movieId,
      movieTitle,
      moviePost,
      movieRunTime

    }



    useEffect(() => {

      Axios.post('/api/favorite/favoriteNumber',variables)
        .then(response => {

          setFavoriteNumber(response.data.favoriteNumber)
          if(response.data.success) {

          } else{
            alert('숫자 정보를 가져오는 데 실패했습니다')
          }
        })

        Axios.post('/api/favorite/favorited',variables)
          .then(response => {

            if(response.data.success) {
              setFavorited(response.data.favorited)
            } else{
              alert('정보를 가져오는 데 실패했습니다')
            }
          })


    },[])

    const onCilckFavorite = () => {
      if(Favorited) {
        Axios.post('/api/favorite/removeFromFavorite', variables)
          .then(response => {
              if(response.data.success) {
                setFavoriteNumber(FavoriteNumber - 1)
                setFavorited(!Favorited)
              } else {
                alert('Favorite 리스트에서 지우는 걸 실패했습니다')
              }
          })
      } else {
        Axios.post('/api/favorite/addToFavorite', variables)
          .then(response => {
              if(response.data.success) {
                setFavoriteNumber(FavoriteNumber + 1)
                setFavorited(!Favorited)
              } else {
                alert('Favorite 리스트에서 추가하는 걸 실패했습니다')
              }
          })
      }
    }

    return(
      <div>
        <Button onClick={onCilckFavorite}>{Favorited ? "Not Favorited" : "Add to Favorited"} {FavoriteNumber}</Button>
      </div>
    )
}

export default Favorite
