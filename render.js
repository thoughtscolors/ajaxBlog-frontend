const renderBlogPosts = (blogPosts) => {
  let insertionPoint = document.getElementById('post-selection')
  insertionPoint.innerHTML = ""
  console.log(blogPosts, "in renderBlogPosts");
  blogPosts.forEach(post => {
    let div = document.createElement('div')
    div.classList.add('theBlogSpot')
    let button = document.createElement('button')
    button.id = post.id
    button.addEventListener('click', clearForm)
    button.addEventListener('click', showSelectedBlogPost)
    button.textContent = post.title
    div.append(button)
    insertionPoint.append(div)
  })
}

const renderNewPostOnSuccess = (postID, title, content, image) => {
  console.log("were in render new post");
  let contentWindow = document.getElementsByClassName('show-post')[0]
  contentWindow.id = postID
  document.getElementById('blog-title').innerHTML = title
  document.getElementById('blog-content').innerHTML = content
  document.getElementById('blog-image').setAttribute('src', image)
  addEditDeleteButtons()
  contentWindow.style.display = 'block'
}

const showSelectedBlogPost = () => {
  let postID = event.target.id
  let displayMessage = document.getElementById("save-status")
  axios.get(`https://frozen-fjord-94877.herokuapp.com/posts/${postID}`)
  .then(response => {
   let title = response.data.data.title
   let content = response.data.data.content
   let image = response.data.data.image
   let contentWindow = document.getElementsByClassName('show-post')[0]
   contentWindow.id = postID
   document.getElementById('blog-title').innerHTML = title
   document.getElementById('blog-content').innerHTML = content
   document.getElementById('blog-image').setAttribute('src', image)
   contentWindow.style.display = 'block'
   console.log(response);
   displayMessage.innerHTML = "Success!"
   displayMessage.style.backgroundColor = "rgba(124, 252, 0, .5)"
   $('#save-status').fadeIn(500).delay(2000).fadeOut(500)
   clearForm()
   addEditDeleteButtons()
 })
 .catch(error => {
   console.log(error);
   displayMessage.innerHTML = "Error"
   displayMessage.style.backgroundColor = "rgba(252, 0, 0, .5)"
   $('#save-status').fadeIn(500).delay(2000).fadeOut(500)
 })
}

const renderEditPostOnSuccess = (postID, title, content, image) => {
  console.log("were in render edits");
  let contentWindow = document.getElementsByClassName('show-post')[0]
  contentWindow.id = postID
  document.getElementById('blog-title').innerHTML = title
  document.getElementById('blog-content').innerHTML = content
  document.getElementById('blog-image').setAttribute('src', image)
  contentWindow.style.display = 'block'
}
