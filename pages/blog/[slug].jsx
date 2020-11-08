import { getAllPosts, getPostBySlug, markdownToHtml } from "../../utils"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import styles from "../../styles/Home.module.css"
import Image from "../../components/Image"

const Post = ({ post }) => {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <article
          style={{
            maxWidth: 680,
            margin: "0 32px",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}>
          <header>
            <h1>{post.title}</h1>
            <Image src={post.coverImage} alt={post.title} />
          </header>
          <section>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </section>
        </article>
      </main>
    </div>
  )
}

export const getStaticProps = async ({ params }) => {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "content",
  ])

  const content = await markdownToHtml(post.content || "")

  return {
    props: { post: { ...post, content } },
  }
}

export const getStaticPaths = () => {
  const posts = getAllPosts(["slug"])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export default Post
