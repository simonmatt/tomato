import axios from 'axios';

/**
 * @param {Author} user
 * @param {Repository} repo
 */

export const getReposStar = (user, repo) => {
  return axios.get(`https://api.github.com/repos/${user}/${repo}`);
}
