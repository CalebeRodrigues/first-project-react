import P from 'prop-types';

import './styles.css'

import { PostCard } from "../PostCard";


export const Posts = ({ posts = [] }) => (
     <div className="posts">
        {posts.map((post) => (
            <PostCard key={post.id} {...post} />
        ))}
    </div>
);

Posts.defaultProps = {
  posts: [],
};

Posts.propTypes = {
  posts: P.arrayOf(
    P.shape({
      id: P.number.isRequired,
      title: P.string.isRequired,
      body: P.string.isRequired,
      cover: P.string.isRequired,
  })),
}
