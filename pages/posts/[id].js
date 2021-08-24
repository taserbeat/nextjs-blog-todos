import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ post }) {
  const router = useRouter();

  if (router.isFallback || !post) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={post.title}>
      <p className="m-4">
        {'ID : '}
        {post.id}
      </p>

      {/* タイトル */}
      <p className="mb-4 text-xl font-bold">{post.title}</p>

      {/* 作成日時 */}
      <p className="mb-12">{post.created_at}</p>

      {/* コンテンツ */}
      <p className="px-10">{post.content}</p>

      <Link href="/blog-page" passHref>
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
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
          <span>Back to blog-page</span>
        </div>
      </Link>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();

  // fallbackをtrueにすると、動的ルーティングでHTMLは存在しないが、APIではコンテンツが存在する場合に、
  // APIを実行して取得したコンテンツからHTMLを生成してくれる。
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { post: post } = await getPostData(params.id);

  return {
    props: {
      post,
    },
    // Incremental Static Regeneration: HTMLファイルの再生成機能を利用する。
    // 1. ユーザーがアクセスすると、古いHTMLで応答し、同時にHTMLを最新のデータで更新(再生成)する。
    // 2. 再生成後は、ユーザーからのアクセスに対して最新のHTMLを応答する。
    //    revalidateに秒数を指定することでその秒数間は再生成を行わないようになり、
    //    再生成の頻度を抑制することができる。 (Stale while Revalidation)
    revalidate: 3,
  };
}
