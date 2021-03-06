import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
var validUrl = require('valid-url');
const util = require('util');
const urlExists = util.promisify(require('url-exists'));

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
  /**************************************************************************** */
  app.get( "/filteredimage/",
    async ( req, res, next ) => {
      let { image_url } = req.query;

      if ( !image_url ) {
        return res.status(400)
                  .send(`image_url is required`);
      }

      if (!validUrl.isUri(image_url)) {
        return res.status(400)
                  .send(`image_url is not a valid url`);
      }

      let isExists = await urlExists(image_url);
      if (!isExists) {
        return res.status(400)
                  .send(`image_url is not a valid url`);
      }

      let resultFile: string = null;
      try {
        resultFile = await filterImageFromURL(image_url);
      } catch(e) {
        return res.status(422).send("image_url is not a valid image url");
      }

      return res.status(200).sendFile(resultFile, null, function (err) {
        if (err) {
          next(err);
        } else {
          let fArr = [resultFile];
          deleteLocalFiles(fArr);
          console.log("Deleted file: " + resultFile);
        }
      } );
  } );


  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );


  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
