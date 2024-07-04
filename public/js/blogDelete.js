const deleteBlog = async (event) => {
  try {
    event.preventDefault();
    event.stopPropagation();

    const blog_id = event.target.parentNode.parentNode.id;

    const blogIDInt = parseInt(blog_id, 10);

    console.log(blogIDInt);

    // Note, u have to parse the id to numbers.

    const response = await fetch("/api/blogs/delete", {
      method: "DELETE",
      body: JSON.stringify({ blogIDInt }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/api/users/dash`);
    } else {
      alert("Failed to delete Blog!");
    }
  } catch (error) {
    // Above we pass our variabels to the body of the request.
    // if the request is succesful it will direct us back to the user dash page.

    console.error("Error deleteing:", error);
    alert("An error occurred while deleteing comment. Please try again later.");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const deleteBTN = document.querySelectorAll("#blogDelete");

  if (deleteBTN.length > 0) {
    deleteBTN.forEach((btn) => {
      btn.addEventListener("click", deleteBlog);
    });
  }
});
// Above is our event listener to check if any buttons exist.
