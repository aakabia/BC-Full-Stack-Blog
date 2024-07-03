const createCommentHandler = async (event) => {
  try {
    event.preventDefault();
    event.stopPropagation();

    const comment = document.querySelector("#comment").value.trim();
    const pathArray = window.location.pathname.split("/");
    const blog_idStr = pathArray[pathArray.length - 1];
    const blog_id = parseInt(blog_idStr, 10);

    const alertDiv = document.querySelector("#alert");

    // Above, we grap all our input variables
    // Above,we get the blog id from our doc location
    if (!comment) {
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

    const response = await fetch("/api/comments/create", {
      method: "POST",
      body: JSON.stringify({ comment, blog_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/api/blogs/${blog_id}`);
    } else {
      const errorData = await response.json();
      alert(errorData.message);
    }

    // Above, is our fetch route to create a new comment.
  } catch (error) {
    console.error("Error logging in:", error);
    alert("An error occurred while logging in. Please try again later.");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#createCommentBtn")
    .addEventListener("click", createCommentHandler);
});
// Above, we make sure the document is loaded befoe anythign else.
