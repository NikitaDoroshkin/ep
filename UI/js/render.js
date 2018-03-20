var render = (function () {
    const TOP = 10;

    function element(type, className, text) {
        var elem = document.createElement(type);
        elem.className = className;

        if (text) {
            elem.innerText = text;
        }

        return elem;
    }

    function renderFeed(containerClass) {
        let containerElement = document.getElementsByClassName('post-container'),
            postElement;

        function addHeader(postElement, data) {

        }

        function addImage(postElement, data) {

        }

        function addFooter(postElement, data) {

        }

        let data = photoPosts.getPosts(0, TOP, {});
        for (let i = 0; i < TOP; i++) {
            postElement = element('article', 'post');

            addHeader(postElement, data[i]);
            addImage(postElement, data[i]);
            addFooter(postElement, data[i]);

            containerElement.appendChild(postElement);
        }
    }

})();