const fs = require('fs');

if (!fs.existsSync('db.json')) {
  fs.writeFileSync('db.json', JSON.stringify({
    posts: [
      { id: 1, title: "Hello World" }
    ]
  }, null, 2));
  console.log("db.json created automatically");
}