import P from 'prop-types';

import { useCallback, useEffect, useState } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/loadPosts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = ( { npages } ) => {

  const [ posts, setPosts ] = useState([]);
  const [ allPosts, setAllPosts ] = useState([]);
  const [ page, setPage ] = useState(0);
  const [ postsPerPage] = useState(npages);
  const [ searchValue, setSearchValue ] = useState('');

  const noMorePosts = (page + postsPerPage) >= allPosts.length;

  const filteredPosts = (searchValue) ?
  allPosts.filter(post => {
    return post.title.toLowerCase().includes(searchValue.toLowerCase());
  }) : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, [])

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, (nextPage + postsPerPage));

    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchValue(value);
  }


  return (
    <section className="container">

      <div className="search-container">
        <TextInput searchValue={searchValue} handleChange={handleChange} />


        {!!searchValue && (
          <>
            <h2>Resultados encontrados para {searchValue}:</h2> <br />
          </>
        )}
      </div>

      {(filteredPosts.length > 0) && (
        <Posts posts={filteredPosts} />
      )}

      {(filteredPosts.length === 0) && (
        <h3>Nenhum resultado encontrado!</h3>
      )}

      <div className="button-container">
        {
          (!searchValue) && (
            <Button
              text="Load more posts"
              click={loadMorePosts}
              disabled={noMorePosts}
            />
        )}
      </div>
    </section>
  );
}

Home.propTypes = {
  npages: P.number,
}

Home.defaultProps = {
  npages: 10,
}
