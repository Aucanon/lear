import Layout from "../components/Layout"
import Movie, { loadMovie } from "../components/Movie"
import Swiper, { loadSwiper } from "../components/Swiper"

export default function Home({ swiper, movie }) {
  return (
    <>
      <Layout/>
      <Swiper data={swiper}/>
      <Movie data={movie} title='电影'/>
    </>
  )
}

export async function getStaticProps () {
  let { data: swiper } = await loadSwiper()
  let { data: movie } = await loadMovie() 
  return {
    props: {
      swiper,
      movie
    }
  }
}
