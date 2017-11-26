import { default as parsePath } from 'parse-filepath';
import { default as endsWith } from 'lodash/fp/endsWith';
import { default as lowerCase } from 'lodash/fp/lowerCase';
import { default as flow } from 'lodash/fp/flow';

const endsWithLowerCaseAr = endsWith( 'ar' );
const endsWithArLanguage  = flow( lowerCase, endsWithLowerCaseAr );

export const downloadMW = ( req, res ) => {

  let originalFile = parsePath( req.file.originalname );

  let filename = endsWithArLanguage( originalFile.name ) ? originalFile.name : `${originalFile.name}.AR`;
  let file     = `${filename}${originalFile.ext}`;

  res.set( {
    'Content-disposition': 'attachment; filename=' + file,
    'Content-type'       : req.file.mimetype
  } );

  return res.send( req.file.translated );
}
