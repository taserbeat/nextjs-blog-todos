import { useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';

import Layout from '../components/Layout';
import { getAllTasksData } from '../lib/tasks';
import Task from '../components/Task';

const fetcher = (url) => fetch(url).then((response) => response.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-task/`;

export default function TaskPage({ staticTasks }) {
  // 初回のアクセス時はinitialDataに設定した値がセットされる
  // mutateはキャッシュを更新するコールバックである
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    initialData: staticTasks,
  });

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  useEffect(() => {
    // useSWRで取得したキャッシュを最新のものにする
    mutate();
  }, [mutate]);

  return (
    <Layout title="Task Page">
      {/* タスクのリスト */}
      <ul>
        {sortedTasks &&
          sortedTasks.map((task) => <Task key={task.id} task={task} />)}
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

// ビルド時(yarn build)に呼ばれる
export async function getStaticProps() {
  const staticTasks = await getAllTasksData();

  return {
    props: { staticTasks },
    revalidate: 3,
  };
}
