const createBlogHandler = async (event) => {
  try {
    event.preventDefault();
    event.stopPropagation();

    const description = document.querySelector("#postBody").value.trim();
    const topic = document.querySelector("#title").value.trim();

    const alertDiv = document.querySelector("#alert");

    // Above, we grap all our input variables

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

    const response = await fetch("/api/blogs/create", {
      method: "POST",
      body: JSON.stringify({ topic, description }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/api/users/dash");
    } else {
      const errorData = await response.json();
      alert(errorData.message);
    }

    // Above, is our fetch to make our new blog.
  } catch (error) {
    console.error("Error logging in:", error);
    alert("An error occurred while logging in. Please try again later.");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#createBlogBtn")
    .addEventListener("click", createBlogHandler);
});

// Above, is the to make sure the doc is loaded.
