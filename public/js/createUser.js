const createUserHandler = async (event) => {
  try {
    event.preventDefault();
    event.stopPropagation();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const user_name = document.querySelector("#userName").value.trim();

    const alertDiv = document.querySelector("#alert");

    // Above, we grap all our input variables

    if (!email || !password || !user_name) {
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

    if (password.length < 8) {
      const h6EL = document.createElement("h6");
      h6EL.classList.add("alert");
      h6EL.textContent = "Password must be atleast eight charcters!";

      alertDiv.append(h6EL);

      setTimeout(() => {
        h6EL.remove(); // Removes the alert element after 5 seconds.
      }, 2000);
      return;
    }

    const response = await fetch("/api/users/create", {
      method: "POST",
      body: JSON.stringify({ user_name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      const errorData = await response.json();
      alert(errorData.message);
    }

    // Above, is to log in for the user.
  } catch (error) {
    console.error("Error logging in:", error);
    alert("An error occurred while logging in. Please try again later.");
  }
};

function showPassword() {
  const iconSpan = document.querySelector("#iconSpan");
  const passwordInput = document.querySelector("#password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    iconSpan.innerHTML = '<i class="fas fa-eye-slash"></i>'; // Change icon to show crossed eye
  } else {
    passwordInput.type = "password";
    iconSpan.innerHTML = '<i class="fas fa-eye"></i>'; // Change icon to show regular eye
  }
}
// Above, is a function to show the user password.

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#createUserBtn")
    .addEventListener("click", createUserHandler);

  document.querySelector("#iconSpan").addEventListener("click", showPassword);
});

// Above, we make sure the document is loaded befoe anythign else.