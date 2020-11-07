import { getAllPosts, getPostBySlug, markdownToHtml } from "../../utils";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

const Post = ({ post }) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div className={styles.container}>
      <article style={{ maxWidth: "600px" }}>
        <header>
          <h1>{post.title}</h1>
        </header>
        <section>
          <Image
            src={post.coverImage}
            height="100%"
            width="100%"
            layout="responsive"
          />
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </section>
      </article>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "content",
  ]);

  const content = await markdownToHtml(post.content || "");

  return {
    props: { post: { ...post, content } },
  };
};

export const getStaticPaths = () => {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export default Post;
