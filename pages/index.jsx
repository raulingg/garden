import Head from "next/head"
import Footer from "../components/Footer"
import styles from "../styles/Home.module.css"
import { getAllPosts } from "../utils"
import Link from "next/link"
import Image from "../components/Image"

export default function Home({ allPosts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Raulingg Blog created with Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to my Blog</h1>

        {allPosts.map((post) => (
          <article key={post.slug}>
            <header>
              <h2>
                <Link href={`/blog/${post.slug}`}>
                  <a>{post.title}</a>
                </Link>
              </h2>
              <h5>{new Intl.DateTimeFormat().format(new Date(post.date))}</h5>
            </header>
            <section style={{ maxWidth: "600px" }}>
              <Image src={post.coverImage} alt="Dynamic Routing" />
              <p>{post.excerpt}</p>
            </section>
          </article>
        ))}
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ])

  return {
    props: { allPosts },
  }
}
