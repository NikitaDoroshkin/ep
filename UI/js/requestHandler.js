var requestHandler = (function () {
    let skip = 0;

    function signIn() {
        debugger;
        let username = document.getElementById('input-username').value,
            password = document.getElementById('input-password').value,
            user;
        if (users.authorize(username, password)){
            render.renderUser(users.getUser());
            render.removeModal();
        }
    }

    function loadMore() {

    }

    return {
        signIn:signIn,
        loadMore: loadMore
    }
})();