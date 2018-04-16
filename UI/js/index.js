function init() {
    let container = document.getElementsByClassName('post-container')[0];
    container.insertBefore(render.addPost(1), container.children[1]);
    render.renderUser(users.getUser());
}

window.onload = init;

window.onclick = function (event) {
    let modal = document.getElementsByClassName('modal')[0];
    if (event.target == modal)
        render.removeModal(modal);
}