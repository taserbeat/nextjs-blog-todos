import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookie from 'universal-cookie';

import Layout from '../components/Layout';

const cookie = new Cookie();

export default function MainPage() {
  const router = useRouter();

  const logout = () => {
    cookie.remove('access_token');
    router.push('/');
  };

  return (
    <Layout title="Main Page">
      <div className="mb-10">
        {/* ブログページへのリンク */}
        <Link href="/blog-page">
          <a className="bg-indigo-500 mr-8 hover:bg-indigo-600 text-white px-4 py-12 rounded">
            Visit Blog by SSG + ISR
          </a>
        </Link>

        {/* タスクページへのリンク */}
        <Link href="/task-page">
          <a className="bg-gray-500 mr-8 hover:bg-gray-600 text-white px-4 py-12 rounded">
            Visit Task by ISR + CSR
          </a>
        </Link>
      </div>

      <svg
        className="mt-10 cursor-pointer h-6 w-6"
        onClick={logout}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    </Layout>
  );
}
