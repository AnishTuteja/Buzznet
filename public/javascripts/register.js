document
    .getElementById("registration-form")
    .addEventListener("submit", async function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const requestData = {
            username: username,
            password: password,
        };

        try {
            const response = await fetch("/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
            const data = await response.json();

            if (response.ok) {
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
            } else {
                toastr.error(data.error, "Error", { timeOut: 3000 });
            }
        } catch (error) {
            toastr.error("An error occured. Please try again");
        }
    });
