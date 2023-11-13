document.addEventListener("DOMContentLoaded", async function (event) {
    await loadUserProfile();
    await loadPostSection();
});

async function loadPostSection() {
    try {
        const postSection = document.getElementById("postSection");
        const posts = await getUserPosts();
        posts.sort((a, b) => new Date(b.dtAdded) - new Date(a.dtAdded));
        postSection.innerHTML = "";
        for (let i = 0; i < posts.length; i++) {
            postSection.innerHTML += `<div class="card my-4">
            <div class="card-header">
                ${getTimeSincePost(posts[i].dtAdded)}
            </div>
            <div class="card-body">
                <p class="card-text">${posts[i].content}
                </p>
            </div>
        </div>`;
        }
        document.getElementById("spinnerPostSection").classList.add("d-none");
        postSection.classList.remove("d-none");
    } catch (err) {
        toastr.error(err);
    }
}

async function getUserPosts() {
    try {
        const response = await fetch("/app/post");
        if (!response.ok) {
            throw new Error("Error fetching data. Please try again later");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        toastr.error(err);
    }
}

async function getUserData() {
    try {
        const response = await fetch("/app/user");
        if (!response.ok) {
            throw new Error("Error fetching data. Please try again later");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        toastr.error(err);
    }
}

async function loadUserProfile() {
    try {
        const editableAbout = document.getElementById("editableAbout");
        const changeAbout = document.getElementById("changeAbout");
        const about = document.getElementById("about");
        const editAbout = document.getElementById("editAbout");

        editableAbout.classList.add("d-none");
        changeAbout.classList.add("d-none");

        const data = await getUserData();
        about.classList.remove("d-none");
        editAbout.classList.remove("d-none");
        document.getElementById(
            "wish"
        ).innerText = `Good Morning ${data.username}`;
        document.getElementById("username").innerText = data.username;
        document.getElementById("about").innerText = data.about;
        document.getElementById("bzpoints").innerText = data.BZpoints;
        document.getElementById(
            "title"
        ).innerText = `Buzznet • ${data.username}`;
        document.getElementById("spinnerProfileCol").classList.add("d-none");
        document.getElementById("profileCol").classList.remove("d-none");
    } catch (err) {
        toastr.error(err);
    }
}

function editAbout() {
    const about = document.getElementById("about");
    const editableAbout = document.getElementById("editableAbout");
    about.classList.add("d-none");
    editableAbout.classList.remove("d-none");
    document.getElementById("editAbout").classList.add("d-none");
    document.getElementById("changeAbout").classList.remove("d-none");
    editableAbout.value = about.textContent;
}

async function changeAbout() {
    const editableAbout = document.getElementById("editableAbout");
    const newAbout = editableAbout.value;
    document.getElementById("spinnerProfileCol").classList.remove("d-none");
    document.getElementById("profileCol").classList.add("d-none");
    try {
        const response = await fetch("/app/about", {
            method: "POST",
            body: JSON.stringify({ about: newAbout }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            loadUserProfile();
            toastr.success("About updated successfully!");
        } else {
            toastr.error(data.error, "Error", { timeOut: 3000 });
        }
    } catch (error) {
        toastr.error("An unknown error occured. Please try again");
    }
}

const form = document.getElementById("form");
form.addEventListener("submit", async function (event) {
    event.preventDefault();
    document.getElementById("postSection").classList.add("d-none");
    document.getElementById("spinnerPostSection").classList.remove("d-none");
    const post = document.getElementById("post");
    try {
        const response = await fetch("/app/post", {
            method: "POST",
            body: JSON.stringify({ content: post.value }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            toastr.success("New post created successfully!");
            post.value = "";
            loadPostSection();
        } else {
            toastr.error(data.error, "Error", { timeOut: 3000 });
        }
    } catch (error) {
        toastr.error("An unknown error occured. Please try again");
    }
});

function getTimeSincePost(dateAdded) {
    const currentDate = new Date();
    const postDate = new Date(dateAdded);
    const timeDifference = currentDate - postDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day(s) ago`;
    } else if (hours > 0) {
        return `${hours} hour(s) ago`;
    } else if (minutes > 0) {
        return `${minutes} minute(s) ago`;
    } else {
        return `${seconds} second(s) ago`;
    }
}
