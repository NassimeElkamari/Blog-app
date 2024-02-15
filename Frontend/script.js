const api = "http://localhost:3000/api";
const card = document.getElementById("cards");

async function getData() {
  const res = await fetch(api);
  const data = await res.json();
  if (data) {
    data.forEach((element) => {
      const postId = element.id;
      card.innerHTML += `
        <div class="col-lg-4">
          <div class="cards mt-5 mb-4">
            <img class="img-fluid" src="images/blog1.jpg" alt="blog1" />
            <div class="p-3 text-center">
              <h2>${element.title}</h2>
              <p>${element.content}</p>
              <div>
                <button id="editbutton" class="btn btn-warning" onClick="appearContainer()" >Edit</button>
                <button class="btn btn-danger" onclick="deletePost(${postId})">Delete</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }
}



getData();


async function deletePost(postId) {
  if (!confirm("Are you sure you want to delete this post?")) {
    return;
  }
  const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    console.log("Post deleted successfully");
    // You might want to remove the deleted post from the UI as well
  } else {
    console.error("Failed to delete post:", response.statusText);
  }
}

document.getElementById("postForm").addEventListener("submit", async (event) => {
  event.preventDefault(); 
  await postFormData(); 
});

async function postFormData() {
  const form = document.getElementById("postForm");
  const formData = new FormData(form);

  const response = await fetch("http://localhost:3000/api/posts", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    console.log("Post added successfully");
    // You can also refresh the page or clear the form here if needed
  } else {
    console.error("Failed to add post:", response.statusText);
  }
}

// Function to fetch post data by ID
async function getPostById(postId) {
  const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
  const data = await response.json();
  return data;
}

// Get the postId from URL query parameter and populate the form on page load
window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  document.getElementById('postId').value = postId; // Set postId in hidden input field

  try {
    await populateForm(postId);
  } catch (error) {
    console.error('Failed to load post data:', error);
    window.alert('Failed to load post data. Please try again.');
  }
};


const edittitle = document.getElementById('editTitle');
const editimage = document.getElementById('editImage');
const editdesc = document.getElementById('editDescription');



// Event listener for form submission
const submitbutton = document.getElementById('submitButton');
submitbutton.addEventListener('click',async () => {
  await updatePost();
});


// Function to update the post
async function updatePost() {
  const form = document.getElementById('editForm');
  const formData = new FormData(form);  
  const postId = document.getElementById('postId').value;


  const postUpdated = {
    title : edittitle.value ,
    content : editdesc.value ,
    picture : editimage.value ,
  }
  
  try{
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
      method: 'PATCH', 
      body: postUpdated,
    });

    if (response.ok) {
      window.alert('Post updated successfully');
    } else {
      throw new Error(`Failed to update post: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to update post:', error);
    window.alert('Failed to update post. Please try again.');
  }
}


const editButton = document.getElementById("editbutton");
const firstContainer = document.querySelector(".container");
const secondContainer = document.querySelector(".second_container");

console.log(editButton);

function appearContainer() {
      
  if (firstContainer.style.display = "none") {
    secondContainer.style.display = "block";
  }else{
    secondContainer.style.display = "none";

  }

};