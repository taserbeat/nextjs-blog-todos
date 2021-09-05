import fetch from 'node-fetch';

export async function getAllTasksData() {
  const response = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-task/`)
  );

  const tasks = await response.json();

  const sortedTasks = tasks.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return sortedTasks;
}

export async function getAllTaskIds() {
  const response = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-task/`)
  );

  const tasks = await response.json();

  const ids = tasks.map((task) => {
    return {
      params: { id: String(task.id) },
    };
  });

  return ids;
}

export async function getTaskData(id) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/detail-task/${id}/`
  );

  const task = await response.json();

  return task;
}
