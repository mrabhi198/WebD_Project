const signUpForm = document.getElementsByClassName("signup-form")[0];
// const loginForm = document.getElementsByClassName("login-form")[0];

signUpForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = {
    username: this.elements.username.value,
    email: this.elements.email.value,
    password: this.elements.password.value,
  };

  try {
    const response = await fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    // Display the message in an alert
    alert(data.message);
    if (data.message === "Signup successful!") location.href = "login.html";
  } catch (err) {
    console.log(err);
  }
});

// google
function onGoogleSignUp(googleUser) {
  var profile = googleUser.getBasicProfile();
  var username = profile.getName();
  var email = profile.getEmail();
  // Send username and email to your server for sign-up
  // Example: You can use AJAX to send data to your server
  console.log(username, email);
}

// loginForm.addEventListener("submit", async function (event) {
//   event.preventDefault();

//   const formData = {
//     username: this.elements.username.value,
//     password: this.elements.password.value,
//   };
//   console.log(formData);

//   try {
//     const response = await fetch("http://127.0.0.1:5000/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();
//     // Display the message in an alert
//     console.log(data);
//     alert(data.message);
//     if (data.message === "Login successful!") location.href = "index.html";
//   } catch (err) {
//     console.log(err);
//   }
// });
