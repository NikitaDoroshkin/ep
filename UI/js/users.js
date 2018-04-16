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

    function authorize(username, password) {
        if (username == 'a' && password == 'b') {
            currentUser = {
                logged: true,
                userData: {
                    id: 1,
                    userName: 'user_login',
                    userPhoto: 'img/user-photo.png'
                }
            }
            return true;
        }
        return false;
    }

    function getUser() {
        if (!currentUser)
            initUser();
        return currentUser.logged ? currentUser : null;
    }

    function loadSession(key) {
        return storage.getItem(key);
    }

    function saveSession(key, data) {
        storage.setItem(key, data);
    }

    return {
        getUser: getUser,
        authorize: authorize
    }

})();