import { useRouter } from 'next/router'

export default function Post ({data}) {

  const router = useRouter()
  if (router.isFallback) return <div>loading</div>

  return <div>
    <span>{data.id}</span>
    <span>{data.title}</span>
  </div>
}

// 返回用户可以访问到的所有路由参数
export async function getStaticPaths () {
  return {
    paths: [{params: {id: '1'}}, {params: {id: '2'}}],
    fallback: true
  }
}

// 返回路由参数多对应的具体的数据
export async function getStaticProps ({params}) {
  console.log('hhhhh');
  const id = params.id
  let data
  switch (id) {
    case '1':
      data = {id: 1, title: 'hello'}
      break
    case '2':
      data = {id: 1, title: 'world'}
      break
    case '3':
      data = {id: 3, title: 'hellll world'}
      break
    default:
      data = {}
  }
  return {
    props: {
      data
    }
  }
}