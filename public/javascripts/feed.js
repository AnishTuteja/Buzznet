document.addEventListener("DOMContentLoaded", async (e) => {
    const posts = await fetchPosts();
    document.getElementById("placeholder").classList.add("d-none");
    posts.sort((a, b) => new Date(b.dtAdded) - new Date(a.dtAdded));
    for (let i = 0; i < posts.length; ++i) {
        document.getElementById("posts").innerHTML += renderPostCard(posts[i]);
    }
});

async function fetchPosts() {
    try {
        const response = await fetch("/app/getAllPosts");
        if (!response.ok) {
            throw new Error("Error fetching data. Please try again later");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        toastr.error(err);
    }
}

function renderPostCard(post) {
    return `<div class="p-3 bg-info bg-opacity-10 border border-info rounded my-2 w-75">
    <div class="d-flex justify-content-between align-items-center border-bottom border-success-subtle p-2">
        <div class="d-flex">
            <div class="image-button-container">
                <label for="fileInput" class="image-button">
                    <img src="/images/dp.jpeg" alt="Current Image"
                        class="img-thumbnail rounded-circle original-image" style="width: 50px; height: 50px;">
                    <input type="file" id="fileInput" accept=".png, .jpg, .jpeg" style="display: none;">
                </label>
            </div>
            <span class="fw-light fs-3 text-white mx-2">
                @buzznetUser ${Math.floor(Math.random() * 100) + 1}
            </span>
        </div>
        <div class="text-white fst-italic">~${getTimeSincePost(
            post.dtAdded
        )}</div>
    </div>
    <blockquote class="blockquote text-white mt-2 fs-6">
        <p>${post.content}</p>
    </blockquote>
    <div class="mt-2 border-secondary border-top d-flex justify-content-around p-2">
        <button class="btn text-white  text-opacity-75">Likes ${post.likes}
            <img src="/images/like.png" alt="" style="height: 25px; width: 25px">
        </button>
        <div class="text-white  text-opacity-75">Comment
            <img src="/images/comment.png" alt="" style="height: 25px; width: 25px">
        </div>
        <div class="text-white  text-opacity-75">Share
            <img src="/images/share.png" alt="" style="height: 25px; width: 25px">
        </div>
    </div>
</div>`;
}

async function addPost() {
    const post = document.getElementById("newPost");
    if (post.value === "") {
        return toastr.error("New Post can't be empty", "Error", {
            timeOut: 3000,
        });
    }
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
        } else {
            toastr.error(data.error, "Error", { timeOut: 3000 });
        }
    } catch (err) {
        toastr.error("An unknown error occured. Please try again");
    }
}

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
