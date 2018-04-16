var users = (function () {
    let currentUser,
        storage;

    function initUser() {
        storage = window.localStorage;
        let userData = loadSession('currentUser');
        if (!userData) {
            saveSession('currentUser', JSON.stringify({ logged: false }));
            userData = { logged: false };
        } else {
            userData = JSON.parse(userData);
        }
        currentUser = userData;
    }

    function getUser() {
        if (!currentUser)
            initUser();
        return currentUser.logged ? currentUser.userData.id : null;
    }

    function loadSession(key) {
        return storage.getItem(key);
    }

    function saveSession(key, data) {
        storage.setItem(key, data);
    }

    return {
        getUser: getUser
    }

})();