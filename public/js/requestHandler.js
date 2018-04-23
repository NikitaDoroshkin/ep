var requestHandler = (function () {
    let skip = 0;

    function getPostContainer() {
        return document.getElementsByClassName('post-container')[0];
    }
    function signIn() {
        let username = document.getElementById('input-username').value,
            password = document.getElementById('input-password').value,
            user;
        if (users.authorize(username, password)) {
            render.removeModal();
            render.renderUser(users.getUser());
            debugger;
            render.renderFeed(getPostContainer(), true);
        } else {
            render.modalError('Wrong username or password');
        }
    }

    function signOut() {
        users.unauthorize();
        render.renderUser(users.getUser());
        render.renderFeed(getPostContainer(), true);
    }

    function loadMore() {
        render.renderFeed(getPostContainer());
    }

    function addPost() {
        let image = 'img/sampl1.jpg',
            description = document.getElementById('input-description').value,
            tags = document.getElementById('input-tags').value;

        if (photoPosts.addPhotoPost({
            author: users.getUser().userName,
            createdAt: (new Date()).toISOString(),
            description: description,
            photoLink: image
        })) {
            render.renderFeed(getPostContainer(), true);
            render.removeModal();
        }
    }

    function editPost() {
        let image = 'img/sampl1.jpg',
            description = document.getElementById('input-description').value,
            tags = document.getElementById('input-tags').value;

        if (photoPosts.editPhotoPost({
            description: description,
            photoLink: image
        })) {
            render.renderFeed(getPostContainer(), true);
            render.removeModal();
        }
        render.removeModal();
    }

    function deletePost(event) {
        debugger;
        let el = event.currentTarget;
        while ((el = el.parentElement) && !el.classList.contains('post'));
        photoPosts.removePhotoPost(el.id);
        render.renderFeed(getPostContainer(), true);
    }

    return {
        signIn: signIn,
        loadMore: loadMore,
        signOut: signOut,
        addPost: addPost,
        editPost: editPost,
        deletePost: deletePost
    }
})();