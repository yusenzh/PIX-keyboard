// For the Keyboards homework, you should not change anything in this file.
// Static file server -- we can't just load from the filesystem because of CORS.

import * as path from "path"; // path is needed to help format our directory structure, for the static file handling
import express from "express"; // Express is a popular libary for building web servers -- it will handle the HTTP requests for us
import * as http from 'node:http'; // this is a built-in, but we're explicitly importing it to have access to the type definition


// ======== HTTP server to statically serve files =========
const PORT : number = parseInt(process.env.PORT) || 3000;
const server : http.Server = express()
	.use(express.static(path.join(__dirname, 'frontend')))
	.listen(PORT, () => console.log(`Navigate to localhost:${PORT}/index.html`));
