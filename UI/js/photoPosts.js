var photoPosts = (function () {
    let database = [
        {
            id: '1',
            description: 'Sample description',
            createdAt: new Date('2018-01-15T23:00:00'),
            author: 'username',
            photoLink: 'img/sampl1.jpg'
        },
        {
            id: '2',
            description: 'Sample description',
            createdAt: new Date('2018-02-23T23:30:00'),
            author: 'username',
            photoLink: 'img/sampl1.jpg'
        }
    ];

    const CONSTANTS = {
        EXPRESSIONS: {
            isString: (post, name) => post.hasOwnProperty(name) && typeof post[name] === 'string',
            id: (post) => this.isString(post, 'id') && getPostById(post.id) != undefined,
            descriprion: (post) => this.isString(post, 'description') && post.descriprion.length < 200,
            createdAt: (post) => post.createdAt instanceof Date,
            author: (post) => this.isString(post, 'author') && post.author.length > 0,
            photoLink: (post) => this.isString(post, 'photoLink') && post.photoLink.length > 0
        },
        EDITABLE_FIELD: ['description', 'photoLink']
    };


    function getPosts(skip = 0, top = 10, filterConfig) {
        if (!(typeof skip === 'number' && skip >= 0 && typeof top === 'number' && top >= 0))
            return {
                type: 'error',
                descriprion: 'wrong arguments'
            };

        let applyFilters = (filterConfig == null || Object.keys(filterConfig).length === 0)
            ? (post) => true
            : (post) => {
                let fields = Object.keys(filterConfig);
                return fields.every((field) => post[field] === filterConfig[field])
            };

        let posts = database.slice(skip, skip + top).filter(applyFilters);

        return {
            type: 'success',
            posts: posts
        };
    }

    function getPostById(id) {
        let post = database.find((element) => element.id == id);

        if (post == undefined)
            return {
                type: 'error',
                descriprion: 'post not found'
            };

        return {
            type: 'success',
            post: post
        };
    }

    function validatePhotoPost(post, fieldList) {
        if (fieldList == null || fieldList.length == 0) {
            fieldList = Object.keys(CONSTANTS.EXPRESSIONS);
        }
        return CONSTANTS.EXPRESSIONS.every((expression) => expression(post));
    }

    function addPhotoPost(post) {
        if (!validatePhotoPost(post))
            return false;
        database.push(post);
        return true;
    }

    function editPhotoPost(id, photoPost) {
        let searchResult = getPostById(id);
        if (searchResult.type == 'error')
            return false;

        let postToEdit = searchResult.post;
        CONSTANTS.EDITABLE_FIELD.forEach((field) => {
            if (validatePhotoPost(photoPost, field))
                postToEdit[field] = photoPost[field];
        });
        return true;
    }

    function removePhotoPost(id) {
        let searchResult = getPostById(id);
        if (searchResult.type == 'error')
            return false;
        database.splice(database.indexOf(searchResult.post), 1);
        return true;
    }

    return {
        getPosts: getPosts,
        getPostById: getPostById,
        validatePhotoPost: validatePhotoPost,
        addPhotoPost: addPhotoPost,
        editPhotoPost: editPhotoPost,
        removePhotoPost: removePhotoPost
    };
})();