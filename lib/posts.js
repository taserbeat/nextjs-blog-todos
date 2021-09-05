import fetch from 'node-fetch';

export async function getAllPostsData() {
  const response = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-post/`)
  );

  const posts = await response.json();

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return sortedPosts;
}

export async function getAllPostIds() {
  const response = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-post/`)
  );

  const posts = await response.json();

  const ids = posts.map((post) => {
    return {
      params: { id: String(post.id) },
    };
  });

  return ids;
}

export async function getPostData(id) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/detail-post/${id}/`
  );

  const post = await response.json();

  return post;
}
