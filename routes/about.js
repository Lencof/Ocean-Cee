const {Router} = require('express');
const router = Router();


// Тишко Page
router.get('/about', function (req, res) {
    res.send('about');
});

module.exports = router;