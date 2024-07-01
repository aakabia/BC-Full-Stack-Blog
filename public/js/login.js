const loginFormHandler = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  const alertDiv = document.querySelector("#alert");

  // Above, we grap all our input variables

  if (!email || !password) {
    const h5EL = document.createElement("h5");
    h5EL.classList.add("alert");
    h5EL.textContent = "Please Fill All Entries!";

    alertDiv.append(h5EL);

    setTimeout(() => {
      h5EL.remove(); // Removes the alert element after 5 seconds.
    }, 2000);
    return;
  }

  // Above, we chack if all our selected elements exist.

 

  const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to log in due to incorrect Email or Password!");
  }


  // Above, is to log in for the user.
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
    .querySelector("#logInBtn")
    .addEventListener("click", loginFormHandler);

  document.querySelector("#iconSpan").addEventListener("click", showPassword);
});

// Above, we wait till the document is loaded before adding any of our listeners.
