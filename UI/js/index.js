function init() {
    let container = document.getElementsByClassName('post-container')[0];
    render.renderUser(users.getUser());
    render.renderFeed(container);
}

window.onload = init;

window.onclick = function (event) {
    let modal = document.getElementsByClassName('modal')[0];
    if (event.target == modal)
        render.removeModal(modal);
}