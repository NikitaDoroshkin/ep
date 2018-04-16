var render = (function () {
    const TOP = 10;

    var user = 'Man';

    var modals = {};

    // <div id="signInForm" class="modal">
    //     <div class="modal-content">
    //         <p>Some text in the Modal Body</p>
    //         <p>Some other text...</p>
    //     </div>
    // </div>

    //to closure
    function generateModal(type) {
        let generators = {
            signIn: function generateSignIn() {
                let modal = element('div', 'modal'), //, null, { id: 'signInForm' }
                    modalContent = element('div', 'modal-content');

                modalContent.appendChild(element('input', 'filter', null,
                    {
                        id: 'input-username',
                        type: 'text',
                        placeholder: 'Username'
                    }));
                modalContent.appendChild(element('input', 'filter', null,
                    {
                        id: 'input-password',
                        type: 'password',
                        placeholder: 'Password'
                    }));
                modalContent.appendChild(element('button', 'main-button sign-in-button', 'Sign in',
                    {
                        onclick: 'requestHandler.signIn()'
                    }));

                modal.appendChild(modalContent);
                modals[type] = modal;
            }
        }

        if (!modals[type])
            generators[type]();
        return modals[type];
    }

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

    function renderUser(data) {
        let container = document.getElementsByClassName('user-container')[0];
        if (data != null) {
            container.appendChild(element('div', null, data.userData.login));
            container.appendChild(element('img', 'user-photo', null,
                {
                    src: data.userData.userPhoto,
                    alt: 'User photo',
                }));
        }
        else {
            container.appendChild(element('button', null, 'login', { onclick: 'render.signInForm()' }));
        }
    }

    function renderFeed() {
        let data = photoPosts.getPosts(0, TOP, {});
        if (data.type === 'success')
            data = data.posts;

        for (let i = 0; i < TOP; i++)
            containerElement.insertBefore(addPost(data[i]),
                containerElement.children[containerElement.children.length - 1]);
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

    function signInForm() {
        debugger;
        let modalName = 'signIn',
            modal = generateModal(modalName);

        document.body.appendChild(modal);
        modal.style.display = "block";
    }


    return {
        renderFeed: renderFeed,
        renderUser: renderUser,
        addPost: addPost,
        removePost: removePost,
        editPost: editPost,
        renderUser: renderUser,
        signInForm: signInForm
    }
})();