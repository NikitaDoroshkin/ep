# Photoshots
### Description
Photo portal, in which users can upload
photos with descriptions (photo posts) and view them in
feed. All users can add, edit and
delete photo posts. Posts are grouped using a convenient
a hashtag system for filtering (#name). All screens and
portal functions are done without reloading the page
(SPA). There are two types of users:
* An authorization button is displayed for an unauthorized user. After clicking on the button, the user goes to the "Authorization form" screen
* An authorized user displays the user name and exit button.

After clicking on the button, the user becomes unauthorized and moves to the screen "Main / Tape of photo posts".
An authorized user can edit his photo posts. After clicking on the edit button for the post is transferred to the "Adding / editing a photo of a post."
An authorized user can delete his photo post. After clicking on the button
"Delete the post" the user must confirm that he wants to delete the photo post.
Removed posts are not deleted, but are marked as deleted, and no longer displayed in the feed.
On the page you can initially see 10 posts. At the bottom of the page there is a button "Load more", by clicking on which are added to the current posts 10 more posts (if any
exists). If all existing posts are displayed on the page, then the button "Load more" should be hidden.
The filter of photo posts contains elements of filtering the tape of photo posts. The posts can be filtered by:<br>

* Author's username
* Date
* Hashtags

### Usage
1. [Install Express.js](https://expressjs.com/en/starter/installing.html) 
2. Make local copy of repository
```
git clone
```
3. Go to public folder in cmd and use command
```
$ node app.js
```
4. When server is started you can access the site in browser at next address
```
http://localhost:3000/ 
```
