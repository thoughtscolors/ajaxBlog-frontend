



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

// function renderBlogPosts(blogPosts) {
//   document.getElementById('blog-title').innerHTML = blogPosts.data[0].title
//   document.getElementById('blog-content').innerHTML = blogPosts.data[0].content
//   document.getElementById('blog-image').innerHTML = blogPosts.data[0].image
//
// }

function getBlogPosts () {
  let blogPosts
  axios.get('http://localhost:3000/posts')
  .then(response => {
    blogPosts = response.data
    document.getElementById('blog-title').innerHTML = blogPosts.data[0].title
    document.getElementById('blog-content').innerHTML = blogPosts.data[0].content
    document.getElementById('blog-image').setAttribute('src', blogPosts.data[0].image)
    blogPosts.data.forEach(index => {
      let button = document.createElement('button')
      button.addEventListener('click', ev => {
        console.log('ello');
        let contentWindow = document.getElementById('show-post')
        let formArray = document.querySelectorAll('.post-form')
        formArray.forEach(index => {
         index.style.display = 'none'
        })
        contentWindow.style.display = 'block'
      })
      let insertionPoint = document.getElementById('post-selection')
      insertionPoint.innerHTML = ""
      button.textContent = index.title
      insertionPoint.append(button)
    })

    console.log(blogPosts);
  })
  .catch(err => {
    console.log(err);
  })
  // console.log(blogPosts[0].title);
  // renderBlogPosts(blogPosts)
}

function init(ev) {
  console.log('** INITIALIZE **');
  document.getElementById('new').addEventListener('click', showPostForm)
  $( "#save" ).click(function( event ) {
  createPost()
});
  $('form').submit(event => {
    event.preventDefault();
  });
  getBlogPosts()
}

// display the form
let showPostForm = () => {
  console.log('clicked show form');
  let formArray = document.querySelectorAll('.post-form')
  let visibleContent = document.getElementById('show-post')
  visibleContent.style.display = 'none'
  formArray.forEach(index => {
   index.style.display = 'block'
  })
}

// when the form is submitted
let createPost = () => {
    let title = document.getElementById('title').value
    let content = document.getElementById('content').value
    let image = document.getElementById('image').value
    let displayMessage = document.getElementById("save-status")
    axios.post('http://localhost:3000/posts', { title, content, image })
    .then(response => {
     console.log(response);
     displayMessage.innerHTML = "Success!"
     $('#save-status').fadeIn(500).delay(2000).fadeOut(500)
   })
   .catch(error => {
     console.log(error);
     displayMessage.innerHTML = "Not quite"
     $('#save-status').fadeIn(500).delay(2000).fadeOut(500)
   })
    getBlogPosts()
}
