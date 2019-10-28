var fs = require("fs");

fs.readdir("./public/assets/img", (err, files) => {
  if (!err) {
    fs.writeFile(
      "./public/assets/json/images.json",
      JSON.stringify(files),
      err2 => {
        if (err2) console.error(err2);
        else
          console.log("Image database created: " + files.length + " images.");
      }
    );
  } else {
    console.error("Trouble opening images directory.");
  }
});
