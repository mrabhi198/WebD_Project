const signUpForm = document.getElementsByClassName("signup-form")[0];

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
  console.log(username, email);
}

document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();

  //input values
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  //validation
  if (username.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
      alert('Username: ' + username + '\nEmail: ' + email + '\nPassword: ' + password);
  } else {
      alert('Please fill in all fields.');
  }
});
