document.querySelector("#login-button").addEventListener("click", async () => {
    try {
      const data = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
      };
      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      let response = await fetch("/api/auth/login", opts);
      response = await response.json();
      console.log(response);
      if (response.error) {
        alert(response.error);
      } else {
        location.replace("/");
      }
    } catch (error) {
      alert(error.error);
    }
  });