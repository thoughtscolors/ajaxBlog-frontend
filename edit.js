const editPost = () => {
  let postID = document.getElementsByClassName('show-post')[0].id
  let displayMessage = document.getElementById("save-status")
  let title = document.getElementById('blog-title').innerHTML
  let content = document.getElementById('blog-content').innerHTML
  let image = document.getElementById('blog-image').src

  let editTitle = document.getElementById('title')
  let editContent = document.getElementById('content')
  let editImage = document.getElementById('image')

  editTitle.value = title
  editContent.value = content
  editImage.value = image

  let formArray = document.querySelectorAll('.post-form')
  let saveButton = document.getElementById('save')
  saveButton.removeEventListener('click', createPost, true)
  saveButton.addEventListener('click', saveChanges, true)

  let visibleContent = document.getElementsByClassName('show-post')[0]
  visibleContent.style.display = 'none'
  formArray.forEach(index => {
   index.style.display = 'block'
  })
}

const saveChanges = () => {
    let postID = document.getElementsByClassName('show-post')[0].id
    let title = document.getElementById('title').value
    let content = document.getElementById('content').value
    let image = document.getElementById('image').value
    let displayMessage = document.getElementById("save-status")

    if (!postID || !title || !content || !image) {
      displayMessage.innerHTML = "Error"
      displayMessage.style.backgroundColor = "rgba(252, 0, 0, .5)"
      $('#save-status').fadeIn(500).delay(2000).fadeOut(500)
    } else {
    axios.put(`http://localhost:3000/posts/${postID}`, { title, content, image })
    .then(response => {
     let postID = response.data.data.id
     let title = response.data.data.title
     let content = response.data.data.content
     let image = response.data.data.image
     renderEditPostOnSuccess(postID, title, content, image)
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
}
