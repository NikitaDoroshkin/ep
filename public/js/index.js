function init() {
    let postsContainer = document.getElementsByClassName('post-container')[0];

    render.renderUser(users.getUser());
    render.renderFeed(postsContainer);
}

window.onload = init;

window.onclick = function (event) {
    let modal = document.getElementsByClassName('modal')[0];
    if (event.target == modal)
        render.removeModal(modal);
}