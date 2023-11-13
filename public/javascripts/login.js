const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            const token = data.token;
            document.cookie = `jwtToken=${token}; path=/`;
            window.location.href = "/app/profile";
        } else {
            toastr.error(data.error, "Error", { timeOut: 3000 });
        }
    } catch (error) {
        toastr.error("An error occured during login. Please try again");
    }
});
