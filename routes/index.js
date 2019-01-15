module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `players` ORDER BY id ASC"; // query mysql di get kabeh

        // iki eksekusine

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to my simple app make from NodeJS | View Players"
                , players: result
            });
        });
    },
};