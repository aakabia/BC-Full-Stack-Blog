const deleteComment = async (event) => {
    try{event.preventDefault();
    event.stopPropagation();
  
    const pathArray = window.location.pathname.split("/");
    const blog_id = pathArray[pathArray.length - 1];
    const commentUserID = event.target.parentNode.parentNode.id;
    const commentId = event.target.parentNode.parentNode.dataset.id;

    const blogIDInt = parseInt(blog_id, 10);
    const commentUserIDInt = parseInt(commentUserID, 10);
    const commentIdInt = parseInt(commentId, 10);
     // Note, u have to parse the id to numbers. 



    // Above, we we get the comment user id the comment id and the job id
  
    const response = await fetch("/api/comments/delete", {
      method: "DELETE",
      body: JSON.stringify({ blogIDInt, commentUserIDInt, commentIdInt  }),
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      document.location.replace(`/api/blogs/${blogIDInt}`);
    } else if (response.status === 404) {
      alert("Cannot delete other user Comments");
    } else {
      alert("Failed to delete Comment!");
    }
}
    // Above we pass our variabels to the body of the request.
    // if the request is succesful it will direct us back to the comment page for applicants.

    catch (error) {
        console.error("Error deleteing:", error);
        alert("An error occurred while deleteing comment. Please try again later.");
    }


};



  
  document.addEventListener("DOMContentLoaded", function () {
    const deleteBTN = document.querySelectorAll("#deleteBTN");
  
    if (deleteBTN.length > 0) {
      deleteBTN.forEach((btn) => {
        btn.addEventListener("click", deleteComment);
      });
    }
  });
  // Above is our event listener to check if any buttons exist.