document.querySelector(
    ".box-navbar"
  ).innerHTML = `<nav class="navbar navbar-expand-md bg-warning">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Home</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
      </div>
    </div>
  </div>
  </nav>`;
  
  async function fetchOnline() {
    try {
      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      let response = await fetch("/api/auth/online", opts);
      response = await response.json();
      //console.log(response);
      if (!response.response) {
        document.querySelector(".navbar-nav").innerHTML = `
              <a class="nav-link" href="/contact.html">Contact</a>
              <a class="nav-link" href="/register.html">Register</a>
              <a class="nav-link" href="/login.html">Login</a>
          `;
      } else {
        document.querySelector(".navbar-nav").innerHTML = `
          <a class="nav-link" href="/contact.html">Contact</a>
          <a class="nav-link" href="/cart.html">Cart</a>
          <a class="nav-link" href="/profile.html">Profile</a>
          <button id="signout-button" class="nav-link">Sign out</button>
      `;
        document
          .querySelector("#signout-button")
          .addEventListener("click", async () => {
            try {
              const opts = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
              };
              let response = await fetch("/api/auth/signout", opts);
              response = await response.json();
              //console.log(response);
              if (response.message) {
                location.replace("/");
              } else {
                alert(response.error);
              }
            } catch (error) {
              alert(error.error);
            }
          });
      }
    } catch (error) {
      document.querySelector(".navbar-nav").innerHTML = `
              <a class="nav-link" href="/contact.html">Contact</a>
              <a class="nav-link" href="/register.html">Register</a>
              <a class="nav-link" href="/login.html">Login</a>
      `;
    }
  }
  
  fetchOnline();
  console.log("se fetcheo bien");