import React from "react";

const Posts = ({ posts }) => {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <a
            href={"https://reddit.com/" + post.permalink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {post.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
export default Posts;
