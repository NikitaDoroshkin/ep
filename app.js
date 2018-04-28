const express = require('express');
const processor = require('./public/js/photoPosts.js');
const app = express();

app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/getPostById', (req, res) => {
    let post = processor.getPostById(req.query.id);
    if (post.type === 'error')
        res.status(404).end("Post not found");
    else
        res.end(JSON.stringify(post.post));
});

app.post("/getPosts", (req, res) => {
    let posts = processor.getPosts(req.query.skip, req.query.top, req.body);    

    if (posts.type === 'error')
        res.status(404).end("Posts not found.");
    else
        res.end(JSON.stringify(posts.posts));
});

app.post("/addPhotoPost", (req, res) => {
    let result = processor.addPhotoPost(req.body);
    if (!result)
        res.status(400).end("Invalid post");
    else
        res.end("Post added successfully");
});

app.put("/editPhotoPost", (req, res) => {
    let result = processor.editPhotoPost(req.query.id, req.body);
    if (!result)
        res.status(400).end("Invalid changes");
    else
        res.end("Post edit successfully");
});

app.delete("/removePhotoPost", (req, res) => {
    if (!processor.removePhotoPost(req.query.id))
        res.status(404).end("Post not found");
    else
        res.end("Post is deleted.");
});





app.listen(3000, () => {
    console.log('Server is running...');
});