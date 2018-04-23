var render = (function () {
    const TOP = 10;
    var skip = 0;
    var modals = {};

    //to closure
    function generateModal(type) {
        let generators = {
            signIn: () => {
                let modal = element('div', 'modal'),
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
                modalContent.appendChild(element('button', 'main-button sign-in-confirm', 'Sign in', null,
                    {
                        click: requestHandler.signIn
                    }));

                modal.appendChild(modalContent);
                modals[type] = modal;
            },
            addPost: () => {
                let modal = element('div', 'modal'),
                    modalContent = element('div', 'modal-content');

                modalContent.appendChild(element('input', 'filter', null,
                    {
                        id: 'input-photo',
                        type: 'file',
                        placeholder: 'Photo',
                        accept: 'image/*'
                    }));
                modalContent.appendChild(element('input', 'filter', null,
                    {
                        id: 'input-tags',
                        type: 'text',
                        placeholder: 'Tags'
                    }));
                modalContent.appendChild(element('input', 'filter', null,
                    {
                        id: 'input-description',
                        type: 'text',
                        placeholder: 'Description'
                    }));

                modalContent.appendChild(element('button', 'main-button add-post-confirm', 'Add post', null,
                    {
                        click: requestHandler.addPost
                    }));

                modal.appendChild(modalContent);
                modals[type] = modal;
            },
            editPost: () => {
                let modal = element('div', 'modal'),
                    modalContent = element('div', 'modal-content');

                modalContent.appendChild(element('input', 'filter', null,
                    {
                        id: 'input-photo',
                        type: 'file',
                        placeholder: 'Photo',
                        accept: 'image/*'
                    }));
                modalContent.appendChild(element('input', 'filter', null,
                    {
                        id: 'input-tags',
                        type: 'text',
                        placeholder: 'Tags'
                    }));
                modalContent.appendChild(element('input', 'filter', null,
                    {
                        id: 'input-description',
                        type: 'text',
                        placeholder: 'Description'
                    }));

                modalContent.appendChild(element('button', 'main-button edit-post-confirm', 'Save post', null,
                    {
                        click: requestHandler.editPost
                    }));

                modal.appendChild(modalContent);
                modals[type] = modal;
            }
        }

        if (!modals[type])
            generators[type]();
        return modals[type];
    }

    function element(type, className, text, attributes, events) {
        var elem = document.createElement(type);
        if (className)
            elem.className = className;

        if (text) {
            elem.innerText = text;
        }
        if (attributes)
            for (let attr in attributes)
                elem[attr] = attributes[attr];
        if (events)
            for (let event in events)
                elem.addEventListener(event, events[event]);

        return elem;
    }

    function getPostContainer() {
        return document.getElementsByClassName('post-container');
    }

    function renderUser(userData) {
        let userContainer = document.getElementsByClassName('user-container')[0];
        let addPostButtonContainer = document.getElementById('add-new-post-button-container');

        userContainer.innerHTML = "";
        addPostButtonContainer.innerHTML = "";
        if (userData != null) {
            userContainer.appendChild(element('div', null, userData.userName));
            userContainer.appendChild(element('img', 'user-photo', null,
                {
                    src: userData.userPhoto,
                    alt: 'User photo',
                }));
            userContainer.appendChild(element('button', 'sign-out-button', 'Sign out', null,
                { click: requestHandler.signOut }));

            let addPostButton = element('button', 'main-button', ' Add new post', null,
                {
                    click: render.addPostForm
                });
            addPostButton.insertBefore(element('i', 'fas fa-plus'), addPostButton.firstChild);
            addPostButtonContainer.appendChild(addPostButton);
        }
        else {
            userContainer.appendChild(element('button', 'sign-in-button', 'Sign in', null,
                { click: render.signInForm }));
        }
    }

    function removeModal(modal) {
        function clearModal(modalContent) {
            inputs = modalContent.getElementsByTagName('input');
            for (let i = 0; i < inputs.length; i++)
                inputs[i].value = '';
            let error = modalContent.getElementsByClassName('modal-error');
            if (error.length > 0)
                modalContent.removeChild(error[0]);

        }

        modal = modal || document.getElementsByClassName('modal')[0];
        clearModal(modal.firstChild);
        document.body.removeChild(modal);
    }

    function renderFeed(containerElement, reload) {
        if (reload) {
            skip = 0;
            containerElement.innerHTML = "";
            let loadMoreButton = document.getElementById('more-posts-button');
            if (loadMoreButton.hasAttribute('disabled'))
                loadMoreButton.removeAttribute('disabled');
        }

        let data = photoPosts.getPosts(skip, TOP, {});
        if (data.type === 'success')
            data = data.posts;

        for (let i = 0; i < data.length; i++) {
            containerElement.appendChild(addPost(data[i]));
        }

        let edits = containerElement.getElementsByClassName('fas fa-edit');
        for (let i = 0; i < edits.length; i++){
            edits[i].addEventListener('click', render.editPostForm);
            edits[i].nextSibling.addEventListener('click', requestHandler.deletePost);
            
        }

        skip += 10;
        if (data.length < TOP)
            document.getElementById('more-posts-button').setAttribute('disabled', 'disabled');
    }

    function addPost(data) {
        if (typeof data === 'number') {
            data = photoPosts.getPostById(data);
            if (data.type === 'success')
                data = data.post;
            else
                return false;
        }

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
                let user = users.getUser();
                if (user && user.userName === data.author) {
                    container.appendChild(element('i', 'fas fa-edit', null, { id: 'edit' + data.id }));
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

    // function editPost(id, changes) {
    //     if (!photoPosts.editPhotoPost(id, changes))
    //         return false;
    //     let postContainer = getPostContainer();
    //     let postToEdit = postContainer.querySelector('#' + id);
    //     if (postToEdit == null)
    //         return false;
    //     postToEdit.innerText = addPost(id).innerText;
    //     return true;
    // }

    function signInForm() {
        let modalName = 'signIn',
            modal = generateModal(modalName);

        document.body.appendChild(modal);
        modal.style.display = "block";
    }

    function addPostForm() {
        let modalName = 'addPost',
            modal = generateModal(modalName);

        document.body.appendChild(modal);
        modal.style.display = "block";
    }

    function editPostForm(event) {
        function fillData(postId, modalContent) {
            let post = photoPosts.getPostById(postId).post;
            modalContent.querySelector('#input-description').value = post.description;
            modalContent.querySelector('#input-tags').value = '';
        }
        debugger;
        let postId = event.currentTarget.id.replace(/^\D+/g, '');
        let modalName = 'editPost',
            modal = generateModal(modalName);
        fillData(postId, modal.firstChild);

        document.body.appendChild(modal);
        modal.style.display = "block";
    }

    function modalError(error, modal) {
        modal = modal || document.getElementsByClassName('modal')[0];
        modalContent = modal.firstChild;
        modalContent.appendChild(element('div', 'modal-error', error));
    }

    return {
        renderFeed: renderFeed,
        renderUser: renderUser,
        addPost: addPost,
        removePost: removePost,
        // editPost: editPost,
        renderUser: renderUser,
        signInForm: signInForm,
        addPostForm: addPostForm,
        removeModal: removeModal,
        modalError: modalError,
        editPostForm: editPostForm
    }
})();