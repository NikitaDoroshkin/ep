var photoPosts = (function () {
    var database = [
        {
            id: '1',
            descriprion: 'Sample description',
            createdAt: new Date('2018-01-15T23:00:00'),
            author: 'username',
            photoLink: 'img/sampl1.jpg'
        },
        {
            id: '2',
            descriprion: 'Sample description',
            createdAt: new Date('2018-02-23T23:30:00'),
            author: 'username',
            photoLink: 'img/sampl1.jpg'
        }
    ];

    var editableFields = ['description', 'photoLink'];

    function getPosts(skip = 0, top = 10, filterConfig) {
        if (!(typeof skip === 'number' && skip >= 0 && typeof top === 'number' && top >= 0))
            return {
                type: 'error',
                descriprion: 'wrong arguments'
            };

        var posts = [];

        var applyFilters = (filterConfig == null || Object.keys(filterConfig).length === 0) ?
            function () { return true; } :
            function applyFilters(post) {
                var fields = Object.keys(filterConfig);
                for (var i = 0; i < fields; i++)
                    if (post[fields[i]] != filterConfig[fields[i]])
                        return false;
                return true;
            }

        for (var i = 0; i < top; i++) {
            if (applyFilters(database[skip + i]))
                posts.push(database[i]);
        }

        return {
            type: 'succes',
            posts: posts
        };
    }

    function getPostById(id) {
        var post = database.find((element) => element.id == id);

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
        var isString = (post, name) => post.hasOwnProperty(namr) && typeof post[name] === 'string';

        var expressions = {
            id: (post) => isString(post, 'id') && getPostById(post.id) != undefined,
            descriprion: (post) => isString(post, 'description') && post.descriprion.length < 200,
            createdAt: (post) => post.hasOwnProperty('createdAt') && post.createdAt instanceof Date,
            author: (post) => isString(post, 'author') && post.author.length > 0,
            photoLink: (post) => isString(post, 'photoLink') && post.photoLink.length > 0
        }

        if (fieldList == null || fieldList.length == 0) {
            fieldList = Object.keys(expressions);
        }

        for (var i = 0; i < fieldList.length; i++)
            if (!expressions[fieldList[i]](post))
                return false;

        return true;
    }

    function addPhotoPost(post) {
        if (!validatePhotoPost(post))
            return false;
        database.push(post);
        return true;
    }

    function editPhotoPost(id, photoPost) {
        var searchResult = getPostById(id);
        if (searchResult.type == 'error')
            return false;

        var postToEdit = searchResult.post;
        for (var i = 0; i < editableFields.length; i++) {
            var currentField = editableFields[i];
            if (validatePhotoPost(photoPost, currentField))
                postToEdit[currentField] = photoPost[currentField];
        }
        return true;
    }

    function removePhotoPost(id) {
        var searchResult = getPostById(id);
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