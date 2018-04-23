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
            };
            saveSession('currentUser', JSON.stringify(currentUser));
            return true;
        }
        return false;
    }

    function getUser() {
        if (!currentUser)
            initUser();
        return currentUser.logged ? currentUser.userData : null;
    }

    function loadSession(key) {
        return storage.getItem(key);
    }

    function saveSession(key, data) {
        storage.setItem(key, data);
    }

    function unauthorize() {
        saveSession('currentUser', JSON.stringify({ logged: false }));
        currentUser = { logged: false };
    }

    return {
        getUser: getUser,
        authorize: authorize,
        unauthorize: unauthorize
    }

})();