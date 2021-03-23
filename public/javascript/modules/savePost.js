import axios from 'axios';

const innerZone = document.querySelector('#savedIdeas');

const getSavedPosts = () => {
  let savedPosts = localStorage.getItem('savedPosts');

  if(savedPosts === null) {
    localStorage.setItem('savedPosts', '[]');
  } else {
    return JSON.parse(savedPosts);
  }
}

axios.get('/api/posts')
  .then(response => {
    const posts = response.data;
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts'));
    
    savedPosts.forEach(savedPost => {
      posts.forEach(post => {
        if(post.id == savedPost) {
          let postElement = document.createElement('div');
          postElement.classList.add('idea');
          postElement.innerHTML = `
            <div class="content">
              <div class="ideaBody">${post.postContent}</div>
              <div class="ideaSignature">${post.postSignature} on ${post.date}</div>
            </div>
            <div class="actions">
              <button id="${post.id}" class="btn-danger">Remove Idea 🗑️</button>
            </div>
          `;

          innerZone.appendChild(postElement);
        }
      });
    });
      console.log(savedPosts.length);
      if(savedPosts.length === 0) {
        let noPostMessage = document.createElement('p');
        noPostMessage.classList.add('message');
        noPostMessage.innerHTML = `
          <div class="message__icon">🌟️</div>
          <p class="message__title">No saved ideas?</p>
          <p class="message__text">Save some ideas to see them here</p>
          <a href="/" class="ghost-btn">Go to wall</a>
        `;
        innerZone.appendChild(noPostMessage);
      }
  });

innerZone.addEventListener('click', (e) => {
  if(e.target.classList.contains('btn-danger')) {
    const id = e.target.id;
    const postsLS = getSavedPosts();
    
    if(postsLS.indexOf(id) !== -1) {
      let newPosts = postsLS.filter(post => post !== id);
      localStorage.setItem('savedPosts', JSON.stringify(newPosts));
      e.target.parentElement.parentElement.remove();
      console.log(newPosts === undefined);
      if(newPosts == false) {
        let noPostMessage = document.createElement('p');
        noPostMessage.classList.add('message');
        noPostMessage.innerHTML = `
          <div class="message__icon">🌟️</div>
          <p class="message__title">No saved ideas?</p>
          <p class="message__text">Save some ideas to see them here</p>
          <a href="/" class="ghost-btn">Go to wall</a>
        `;
        innerZone.appendChild(noPostMessage);
      }
    }
  }
});
