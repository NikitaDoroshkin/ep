var requestHandler = (function () {
    let skip = 0;

    function signIn() {
        let username = document.getElementById('input-username').value,
            password = document.getElementById('input-password').value,
            user;
        if (users.authorize(username, password)){
            render.renderUser(users.getUser());
            render.removeModal();
        }
    }

    function loadMore() {
        render.renderFeed(document.getElementsByClassName('post-container')[0]);
    }

    return {
        signIn:signIn,
        loadMore: loadMore
    }
})();