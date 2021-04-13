const fs = require("fs");

module.exports = {
  addPlayerPage: (req, res) => {
    res.render("add-player.ejs", {
      title: "Add a new player",
      message: "",
    });
  },
  addPlayer: (req, res) => {
    if (!req.files) {
      return res.status(400).send("No Files were uploaded.");
    }

    let message = "";
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let position = req.body.position;
    let number = req.body.number;
    let username = req.body.username;
    let uploadFile = req.files.image;
    let image_name = uploadFile.name;
    let fileExtension = uploadFile.mimetype.split("/")[1];
    image_name = username + "." + fileExtension;

    let usernameQuery =
      "SELECT * FROM `players` WHERE user_name ='" + username + "'";

    db.query(usernameQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length > 0) {
        message = "Username already exists";
        res.render("add-player.ejs", {
          message,
          title: "Add new player",
        });
      } else {
        // ngecek tipe file sedurunge di upload
        if (
          uploadFile.mimetype === "image/png" ||
          uploadFile.mimetype === "image/jpeg" ||
          uploadFile.mimetype === "image/gif"
        ) {
          uploadFile.mv("public/assets/img/${image_name}", (err) => {
            if (err) {
              return res.status(500).send(err);
            }
            res.redirect("/");
          });
        } else {
          message =
            "Invalid file format, only 'gif', 'jpeg' and 'png' images are allowed";
          res.render("add-payer.ejs", {
            message,
            title: "Add a new player",
          });
        }
      }
    });
  },
  editPlayerPage: (req, res) => {
    let playerID = req.params.id;
    let query = "SELECT * FROM `players` WHERE id = '" + playerID + "'";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render("edit-player.ejs", {
        title: "Edit Player",
        player: result[0],
        message: "",
      });
    });
  },
  editPlayer: (req, res) => {
    let playerID = req.params.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let position = req.body.position;
    let number = req.body.number;

    let query =
      "UPDATE `players` SET `first_name` = '" +
      first_name +
      "', `last_name` = '" +
      last_name +
      "', `position` = '" +
      position +
      "', `number` = '" +
      number +
      "', WHERE `players`.`id` = '" +
      playerID +
      "'";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect("/");
    });
  },
  deletePlayer: (req, res) => {
    let playerId = req.params.id;
    let getImageQuery =
      'SELECT image from `players` WHERE id = "' + playerId + '"';
    let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';

    db.query(getImageQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      let image = result[0].image;

      fs.unlink(`public/assets/img/${image}`, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        db.query(deleteUserQuery, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.redirect("/");
        });
      });
    });
  },
};
