import Head from "next/head"
import styles from './list.module.css'
import { readFile } from 'fs'
import { promisify } from "util"
import { join } from "path"

const read = promisify(readFile)

export default function List ({ data }) {
  return (
    <>
      <Head>
        <title>list</title>
      </Head>
      <div className={styles.demo}>
        list
      </div>
      <div>{data}</div>
    </>
  )
}

export async function getServerSideProps (context) {
  console.log(context.query);
  const data = await read(join(process.cwd(), 'pages', '_app.js'), 'utf-8')
  console.log(123);
  return {
    props: {
      data
    }
  }
}