var requestHandler = (function () {
    let skip = 0;

    function signIn() {
        let username = document.getElementById('input-username').value;
        let password = document.getElementById('input-password').value;
    }

    function loadMore() {

    }

    return {
        loadMore: loadMore
    }
})();