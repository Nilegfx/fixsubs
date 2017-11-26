import { default as express } from 'express';
import {
  uploadMW,
  translateMW,
  downloadMW
} from './middlewares/index';

express()
  .use( express.static( 'client/public' ) )
  .post( '/files', uploadMW, translateMW, downloadMW )
  .use( ( req, res ) => res.status( 404 ).send( 'not found!' ) )
  .listen( process.env.PORT, () => console.log( `http://localhost:${process.env.PORT}` ) );
