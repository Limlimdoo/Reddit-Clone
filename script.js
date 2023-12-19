 // Function to fetch posts from DummyJSON and display them
 function fetchAndDisplayPosts() {
    fetch('https://dummyjson.com/posts')
      .then((response) => response.json())
      .then((data) => {
        renderPosts(data.posts);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  // Function to display the posts
  function renderPosts(posts) {
    const postList = document.getElementById('postList');
    postList.innerHTML = ''; // Clear existing posts
    
    posts.forEach((post) => {
      createPostElement(post, postList);
    });
  }
  
  // Function to create a post element
  function createPostElement(post, parentElement) {
    const { title, body, tags, likes, dislikes } = post;
    
    // Create a list item for the post
    const postListItem = document.createElement('li');
    
    // Add classes to the list item
    postListItem.classList.add('post');
    
    // Create elements for post title, body, tags, and actions
    const titleElement = document.createElement('div');
    titleElement.classList.add('title');
    titleElement.innerText = title;
    
    const bodyElement = document.createElement('div');
    bodyElement.classList.add('body');
    bodyElement.innerText = body;
    
    const tagsElement = document.createElement('div');
    tagsElement.classList.add('tags');
    tagsElement.innerText = tags.join(', ');
    
    const actionsElement = document.createElement('div');
    actionsElement.classList.add('actions');
    
    const likeButton = document.createElement('button');
    likeButton.innerText = 'Upvote';
    likeButton.addEventListener('click', () => {
      // like post
      post.likes += 1;
      updateLikesDislikes(post, likesDislikesElement);
    });
    
    const dislikeButton = document.createElement('button');
    dislikeButton.innerText = 'Downvote';
    dislikeButton.addEventListener('click', () => {
      // Dislike post
      post.dislikes += 1;
      updateLikesDislikes(post, likesDislikesElement);
    });
    
    const likesDislikesElement = document.createElement('div');
    likesDislikesElement.classList.add('likes-dislikes');
    
    // Function to update the likes and dislikes count
    function updateLikesDislikes(post, element) {
      element.innerText = `Likes: ${post.likes} | Dislikes: ${post.dislikes}`;
    }
    
    // likes and dislikes count
    post.likes = likes || 0;
    post.dislikes = dislikes || 0;
    
    // Append elements to the list item
    actionsElement.appendChild(likeButton);
    actionsElement.appendChild(dislikeButton);
    postListItem.appendChild(titleElement);
    postListItem.appendChild(bodyElement);
    postListItem.appendChild(tagsElement);
    postListItem.appendChild(actionsElement);
    postListItem.appendChild(likesDislikesElement);
    
    // Add the new post to the top of the list
    parentElement.insertBefore(postListItem, parentElement.firstChild);
  }
  
  // Function to handle the create post button click event
  function handleCreatePost() {
    const postTitle = document.getElementById('postTitle').value;
    const postBody = document.getElementById('postBody').value;
    const postTags = document.getElementById('postTags').value;
    
    // Create a new post object
    const newPost = {
      title: postTitle,
      body: postBody,
      tags: postTags.split(',').map(tag => tag.trim())
    };
    
    // Clear the input fields
    document.getElementById('postTitle').value = '';
    document.getElementById('postBody').value = '';
    document.getElementById('postTags').value = '';
    
    createPostElement(newPost, document.getElementById('postList'));
  }
  
  // Fetch and display the initial posts
  fetchAndDisplayPosts();
  
  // Add event listener to the create post button
  document.getElementById('createPostButton').addEventListener('click', handleCreatePost);




