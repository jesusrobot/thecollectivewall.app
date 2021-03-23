import axios from 'axios';

const tbody = document.querySelector('#publications');
const select = document.querySelector("#numberPosts");

const pagination = (_data) => {
  axios.get('/api/posts')
  .then(response => {

    let data = _data === undefined ? response.data : _data;
    let actualPage = 1;
    let pageSize = 16;
    let _dataResult = [];
    let numberPages = (_data) => Math.ceil(_data.length / pageSize);

    const paginate = (_data, _pageSize, _actualPage) => {
      return _data.slice((actualPage - 1) * _pageSize, _actualPage * _pageSize);
    }

    const previousPage = () => {
      actualPage--;
      showData(data);
    }

    const nextPage = () => {
      actualPage++;
      showData(data);
    }

    const previousPageResult = () => {
      actualPage--;
      showData(_dataResult);
    }

    const nextPageResult = () => {
      actualPage++;
      showData(_dataResult);
    }

    const buildPost = (_element) => {
      const getSavedPosts = JSON.parse(localStorage.getItem('savedPosts'));

      const post = document.createElement('article');
      post.classList.add('publication');
      if(getSavedPosts.length >= 1) {
        getSavedPosts.forEach(postId => {
        if (_element.id == postId) {
          post.classList.add('saved');
          post.innerHTML = `
            <button id="${_element.id}" class="postControlls">Quit Idea <i class="fas fa-star"></i></button>
            <p class="body">${_element.postContent}</p>
            <p class="author">${_element.postSignature} on ${_element.date}</p>
          `;
        } else {
          post.innerHTML = `
            <button id="${_element.id}" class="postControlls">Save Idea <i class="fas fa-star"></i></button>
            <p class="body">${_element.postContent}</p>
            <p class="author">${_element.postSignature} on ${_element.date}</p>
          `;
        }
        });
      }else {
        post.innerHTML = `
          <button id="${_element.id}" class="postControlls">Save Idea <i class="fas fa-star"></i></button>
          <p class="body">${_element.postContent}</p>
          <p class="author">${_element.postSignature} on ${_element.date}</p>
        `;
      }
      
      return post;
    }

    const buildControlls = (_pagination, _data) => {
      if(actualPage > 1) {
        document.getElementById('previous').disabled=false
        document.getElementById('previous').addEventListener('click', previousPage)
      } else {
        document.getElementById('previous').disabled=true
      }
    
      document.getElementById('info').innerHTML = `
        From ${_pagination.length > 0 ? ((actualPage - 1) * pageSize) + 1 : 0}
        to ${_pagination.length + ((actualPage - 1) * pageSize)}
        of ${_data === data ? data.length : _data.length} Posts
      `;

      if(actualPage < numberPages(_data) ) {
        document.getElementById('next').disabled=false
        document.getElementById('next').addEventListener('click', nextPage)
      } else {
        document.getElementById('next').disabled=true
      }
    }

    function showData(_data) {
      let pagination = paginate(_data, pageSize, actualPage);
    
      while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
    
      pagination.forEach(element => {
        let post = buildPost(element);
        tbody.appendChild(post);
      });
    
      if(_data == false) {
        let noPostsMessage = document.createElement('p');
        noPostsMessage.classList.add('message', 'message__home');
        noPostsMessage.innerHTML = `
          <div class="message__icon">🚀️</div>
          <p class="message__title">There are no ideas on the wall yet, be the first!</p>
          <p class="message__text">Click on the "Scratch the wall" button to post the first idea on the collective wall.</p>
        `;
        tbody.appendChild(noPostsMessage);
      }

      buildControlls(pagination, _data);
    }

    const selectNumberPages = () => {
      const value = select.options[select.selectedIndex].value;

      if(value === 'all') {
        actualPage = 1 
        pageSize = data.length;
      } else {
        pageSize = value;
      }

      showData(data)      
    }
    
    select.addEventListener('change', selectNumberPages);
    document.addEventListener('DOMContentLoaded', showData(data));
  });

}

pagination();

export default pagination;