var express = require("express");
//★★★★★★★★★★★★★★★★★★★★★★
//params.id route를 지웠기 때문에 null이 반환된다. => 그 문제를 해결하려면 아래와 같은 코드를 작성한다.
//★★★★★★★★★★★★★★★★★★★★★★★★
var router = express.Router({ mergeParams: true });
var Campground = require("../models/Campground");
var Comment = require("../models/Comment");
var middleware = require("../middleware");

var isLoggedIn = middleware.isLoggedIn;
var checkCommentOwnership = middleware.checkCommentOwnership;
//============
//COMMENTS ROUTES
//============

//유저가 로그인되지 않았다면 코멘트를 못달게 하기 위해서 middleware를 넣었다.
router.get("/new", isLoggedIn, function(req, res) {
  //find campground by id
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

//Post
//url을 통해서 comments 경로로 들어가려고 할 때도 막기위해서 middleware를 적용
router.post("/", isLoggedIn, function(req, res) {
  //lookup campground using ID
  //★★★★★★★★★★★★★★★★★★★★★★
  //params.id route를 지웠기 때문에 null이 반환된다.
  //★★★★★★★★★★★★★★★★★★★★★★★★
  Campground.findById(req.params.id, function(err, campground) {
    //campground가 있어야지 댓글이 있기 때문에 campground부터 찾아야한다.
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      //create new comment
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          //★★★★★add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          console.log("New comment's username will be: " + req.user.username);
          //★★★★★save comment
          comment.save();
          console.log(comment);
          //connect new comment to campground
          campground.comments.push(comment); //다시 한 번 기억하자. campground라는 collection이 ref를 하고 있더라도 Comment라는 collection에 값이 추가된다.
          campground.save(); //저장.
          //redirect campground show page
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

//edit route
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        campground_id: req.params.id,
        comment: foundComment
      });
    }
  });
});

//update route
// /campgrounds/:id/comments/:comment_id
router.put("/:comment_id", function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(
    err,
    updatedComment
  ) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//delete route
router.delete("/:comment_id", checkCommentOwnership, function(req, res) {
  //findByIdAndDelete
  Comment.findByIdAndDelete(req.params.comment_id, function(err) {
    if (!err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//middleware
function isLoggedIn(req, res, next) {
  //req.isAuthenticated also comes from `passport`
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
