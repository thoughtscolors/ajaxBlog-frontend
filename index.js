const render = './render'

document.addEventListener('DOMContentLoaded', ev => {
  init()
});

function init(ev) {
  console.log('** INITIALIZE **');
  document.getElementById('new').addEventListener('click', showPostForm)
  $('form').submit(event => {
    event.preventDefault();
  });
  getBlogPosts()
}

const getBlogPosts = () => {
  return axios.get('http://localhost:3000/posts')
  .then(response => {
    let blogPosts = response.data.data
    console.log(blogPosts, "in getBlogPosts");
    renderBlogPosts(blogPosts)
  })
  .catch(err => {
    console.log(err);
  })
}

const addEditDeleteButtons = () => {
  let insertionPoint = document.getElementById('post-options')
  insertionPoint.innerHTML = ""
  let editButton = document.createElement('button')
  editButton.textContent = "Edit"
  let deleteButton = document.createElement('button')
  deleteButton.textContent = "Delete"
  editButton.addEventListener('click', editPost)
  deleteButton.addEventListener('click', deletePost)
  insertionPoint.append(editButton)
  insertionPoint.append(deleteButton)
}

const showPostForm = () => {
  console.log('clicked show form');
  let title = document.getElementById('title')
  let content = document.getElementById('content')
  let image = document.getElementById('image')

  title.value = ""
  content.value = ""
  image.value = ""

  let formArray = document.querySelectorAll('.post-form')
  let saveButton = document.getElementById("save")
  saveButton.removeEventListener('click', saveChanges, true)
  saveButton.addEventListener('click', createPost, true)
  let visibleContent = document.getElementsByClassName('show-post')[0]
  visibleContent.style.display = 'none'
  formArray.forEach(index => {
   index.style.display = 'block'
  })
}

const createPost = () => {
  console.log('were in create');
    let title = document.getElementById('title').value
    let content = document.getElementById('content').value
    let image = document.getElementById('image').value
    let displayMessage = document.getElementById("save-status")
    axios.post('http://localhost:3000/posts', { title, content, image })
    .then(response => {
     let postID = response.data.data.id
     let title = response.data.data.title
     let content = response.data.data.content
     let image = response.data.data.image
     renderNewPostOnSuccess(postID, title, content, image)
     displayMessage.innerHTML = "Success!"
     displayMessage.style.backgroundColor = "rgba(124, 252, 0, .5)"
     $('#save-status').fadeIn(500).delay(2000).fadeOut(500)
     clearForm()
     getBlogPosts()
   })
   .catch(error => {
     console.log(error);
     displayMessage.innerHTML = "Error"
     displayMessage.style.backgroundColor = "rgba(252, 0, 0, .5)"
     $('#save-status').fadeIn(500).delay(2000).fadeOut(500)
   })
}

const deletePost = () => {
  let contentWindow = document.getElementsByClassName('show-post')[0]
  let postID = contentWindow.id
  let displayMessage = document.getElementById("save-status")
  console.log(postID, "postID in delete post");
  axios.delete(`http://localhost:3000/posts/${postID}`)
  .then (res => {
    console.log(res)
    displayMessage.innerHTML = "Success!"
    $('#save-status').fadeIn(500).delay(2000).fadeOut(500)
    contentWindow.style.display = "none"
    displayMessage.style.backgroundColor = "rgba(124, 252, 0, .5)"
    getBlogPosts()
  })
  .catch (err => {
    console.log(err)
    displayMessage.innerHTML = "Error"
    displayMessage.style.backgroundColor = "rgba(252, 0, 0, .5)"
    $('#save-status').fadeIn(500).delay(2000).fadeOut(500)
  })
}

const clearForm = () => {
  let formArray = document.querySelectorAll('.post-form')
  formArray.forEach(index => {
   index.style.display = 'none'
  })
}
