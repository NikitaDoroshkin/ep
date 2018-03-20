var render = (function () {
    const TOP = 10;

    var user = 'Man';


    function element(type, className, text, attributes) {
        var elem = document.createElement(type);
        elem.className = className;

        if (text) {
            elem.innerText = text;
        }
        if (attributes)
            for (let attr in attributes)
                elem[attr] = attributes[attr];

        return elem;
    }

    function getPostContainer() {
        return document.getElementsByClassName('post-container');
    }

    function renderUser() {
        if (user != null)
            document.getElementsByClassName('current-username').innerText = user;
    }

    function renderFeed() {
        let data = photoPosts.getPosts(0, TOP, {});
        if (data.type === 'success')
            data = data.posts;

        for (let i = 0; i < TOP; i++)
            containerElement.insertBefore(addPost(data[i]), containerElement.children[1]);
    }

    function addPost(data) {
        if (typeof data === 'number')
            data = photoPosts.getPostById(data);
        if (data.type === 'success')
            data = data.post;
        else
            return false;


        let containerElement = getPostContainer(),
            postElement = element('article', 'post', '', { id: data.id });

        function addHeader(postElement, data) {
            let header = element('div', 'post-header');
            let image = element('img', 'user-photo', null, {
                src: 'img/user-photo.png',
                alt: 'User photo'
            });
            let username = element('div', 'username', data.author);
            header.appendChild(image);
            header.appendChild(username);

            postElement.appendChild(header);
        }

        function addImage(postElement, data) {
            let imageContainer = element('div', 'post-image');
            imageContainer.appendChild(element('img', null, null, { src: data.photoLink }));

            postElement.appendChild(imageContainer);
        }

        function addFooter(postElement, data) {
            function addLikesBar(container) {
                container.appendChild(element('i', 'far fa-heart'));
                if (user === data.author) {
                    container.appendChild(element('i', 'fas fa-edit'));
                    container.appendChild(element('i', 'fas fa-trash'));
                }
            };

            function addHashtags(container) {
                container.appendChild(element('div', 'hashtag', '#apples'));
            };
            debugger;
            let footer = element('div', 'post-footer');
            let likesBar = element('div', 'likes-bar');
            let hashtags = element('div', 'hashtags-list');
            addLikesBar(likesBar);
            addHashtags(hashtags);
            footer.appendChild(likesBar);
            footer.appendChild(hashtags);
            footer.innerHTML += data.description;

            postElement.appendChild(footer);
        }

        addHeader(postElement, data);
        addImage(postElement, data);
        addFooter(postElement, data);

        return postElement;
    }

    function removePost(id) {
        let postContainer = getPostContainer();
        let postToRemove = postContainer.querySelector('#' + id);
        if (postToRemove != null && photoPosts.removePhotoPost(id)) {
            postToRemove.remove();
            return true;
        }
        return false;
    }

    function editPost(id, changes) {
        if (!photoPosts.editPhotoPost(id, changes))
            return false;
        let postContainer = getPostContainer();
        let postToEdit = postContainer.querySelector('#' + id);
        if (postToEdit == null)
            return false;
        postToEdit.innerText = addPost(id).innerText;
        return true;
    }

    return {
        renderFeed: renderFeed,
        addPost: addPost,
        removePost: removePost,
        editPost: editPost,
        renderUser
    }
})();

window.onload = function (e) {
    debugger;
    let container= document.getElementsByClassName('post-container')[0];
    container.insertBefore(render.addPost(1), container.children[1]);
};