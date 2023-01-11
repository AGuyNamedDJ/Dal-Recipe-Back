# Dal-Recipe

---

To Do List Order - Backend

1. Init Structure
   - Create local dir
   - Create github & clone
   - npm init -y & dependencies
   - Add scripts in package json
     "test": "echo \"Error: no test specified\" && exit 1",
     "seed": "nodemon ./db/seed/js",
     "start": "node index.js",
     "start:dev": "nodemon index.js",
     "start-seed": "node db/seed.js && node index.js"
   - Create db on Postico
   - Create dirs & root index.js
     - api
       -index.js
       - utilities.js
     - db
       - index.js
       - seed.js
     - index.js
2. Root index.js
