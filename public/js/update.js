

const updateBlogHandler = async (event) => {
    try {
      event.preventDefault();
      event.stopPropagation();
  
      const description = document.querySelector("#postBody").value.trim();
      const topic = document.querySelector("#title").value.trim();
      const pathArray = window.location.pathname.split("/");
      const blog_idStr = pathArray[pathArray.length - 1];
      const blogId = parseInt(blog_idStr, 10);

     


      // Above, we grap all our input variables
      // Note, we grab blog id from the document location





  
      const alertDiv = document.querySelector("#alert");
  

  
      if (!topic || !description) {
        const h6EL = document.createElement("h6");
        h6EL.classList.add("alert");
        h6EL.textContent = "Please Fill All Entries!";
  
        alertDiv.append(h6EL);
  
        setTimeout(() => {
          h6EL.remove(); // Removes the alert element after 5 seconds.
        }, 2000);
        return;
      }
  
      // Above, we chack if all our selected elements exist.
  
      const response = await fetch("/api/blogs/update", {
        method: "PUT",
        body: JSON.stringify({ topic, description, blogId }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/api/users/dash");
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
  
      // Above, is our fetch to opdate our blog.
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in. Please try again later.");
    }
};





















document.addEventListener("DOMContentLoaded", function () {
    document
      .querySelector("#updateBtn")
      .addEventListener("click", updateBlogHandler)    });
  
  // Above, is the to make sure the doc is loaded.