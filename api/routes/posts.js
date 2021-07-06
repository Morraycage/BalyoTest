const express = require("express");
const router = express.Router();
const postsController = require("../controller/posts");

router.post("/productByDay", (req, res) => {
    postsController
        .productByDay(req, res)
        .then((r) => res.status(200).send(r))
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving configs.",
            });
        });
});

module.exports = router;
