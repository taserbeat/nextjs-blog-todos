import Link from 'next/link';

import Layout from '../components/Layout';
import { getAllPostsData } from '../lib/posts';
import Post from '../components/Post';

export default function BlogPage({ sortedPosts }) {
  return (
    <Layout title="Blog Page">
      <ul>
        {sortedPosts &&
          sortedPosts.map((post) => <Post key={post.id} post={post} />)}
      </ul>

      <Link href="/main-page" passHref>
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  );
}

export async function getStaticProps() {
  const sortedPosts = await getAllPostsData();

  return {
    props: { sortedPosts },
    revalidate: 3,
  };
}
