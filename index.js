



// const path =
// var options = {crossDomain: true}
// var invocation = new XMLHttpRequest();
// var url = 'http://localhost:3000/posts';
//
// function callOtherDomain() {
//   if(invocation) {
//     invocation.open('GET', url, true);
//     // invocation.onreadystatechange = handler;
//     invocation.send();
//   }
// }
let blogPosts;

document.addEventListener('DOMContentLoaded', ev => {
  init()
  // callOtherDomain()
});

function renderBlogPosts(blogPosts) {
  document.getElementById('blog-title').innerHTML = blogPosts.data[0].title
  document.getElementById('blog-content').innerHTML = blogPosts.data[0].content
  document.getElementById('blog-image').innerHTML = blogPosts.data[0].image

}

function getBlogPosts () {
  let blogPosts
  axios.get('http://localhost:3000/posts')
  .then(response => {
    blogPosts = response.data
    document.getElementById('blog-title').innerHTML = blogPosts.data[0].title
    document.getElementById('blog-content').innerHTML = blogPosts.data[0].content
    document.getElementById('blog-image').setAttribute('src', blogPosts.data[0].image)
    console.log(blogPosts);
  })
  .catch(err => {
    console.log(err);
  })
  console.log(blogPosts[0].title);
  renderBlogPosts(blogPosts)
}

function init(ev) {
  console.log('** INITIALIZE **');
  document.getElementById('new').addEventListener('click', showPostForm)
  getBlogPosts()
}

// display the form
let showPostForm = () => {
  // show/hide the form
}

// when the form is submitted
let createPost = () => {
    // get values from form
    // axios.post()
    // after the post succeeds, show a message
}
