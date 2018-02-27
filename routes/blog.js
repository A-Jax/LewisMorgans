const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser')

// Load Blogs Model
require('../models/Blog');
const Blogs = mongoose.model('blog');


// Get all blogs
router.get('/find-all', (req, res) => {
    Blogs.find()
        .sort({ date: 'desc' })
        .then(data => {
            res.send(data)
        });
});

// Add new blog
router.post('/postNew', (req, res) => {

    const newBlog = {
        title: req.body.title,
        details: req.body.content,
        date: Date.now()
    }
    new Blogs(newBlog)
        .save()
        .then(blog => {
            console.log('blog added')
        })

});

// // Edit blog post
// router.put('/:id', (req, res) => {
//     Blogs.findOne({
//         _id: req.params.id
//     })
//         .then(blog => {
//             // new values
//             blog.title = req.body.title;
//             blog.details = req.body.details;

//             blog.save()
//                 .then(blogs => {
//                     req.flash('success_msg', 'Blog Post updated');
//                     res.redirect('/blogs');
//                 })
//         });
// });

// Delete Blog
router.post('/deleteBlog', (req, res) => {


    Blogs.remove({ _id: req.body.id })
        .then(() => {
            console.log('removed blog');
            Blogs.find()
            .sort({ date: 'desc' })
            .then(data => {
                res.send(data)
            });
        })
        .catch((err) => {
            console.log(err)
        })
});

module.exports = router;