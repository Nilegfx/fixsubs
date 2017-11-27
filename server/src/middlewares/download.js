import { default as parsePath } from 'parse-filepath';
import { default as endsWith } from 'lodash/fp/endsWith';
import { default as reduce } from 'lodash/fp/reduce';
import { default as lowerCase } from 'lodash/fp/lowerCase';
import { default as map } from 'lodash/fp/map';
import { default as flow } from 'lodash/fp/flow';
import { default as archiver } from 'archiver';
import { isSingular } from '../utils';

const endsWithLowerCaseAr = endsWith( 'ar' );
const endsWithArLanguage  = flow( lowerCase, endsWithLowerCaseAr );

const downloadMWFactory = archiver => ( req, res ) => {

  let files = map( addTranslatedSubFileName )( req.files );

  if ( isSingular( files ) ) {

    let file = files[ 0 ];
    res.set( singleSubHeaders( file ) );
    res.send( file.translated );

  } else {
    let archive          = archiver( 'zip' );
    let zippedSubsStream = appendSubFileToArchive( archive, files );
    res.set( multipleSubsHeaders() );
    zippedSubsStream.pipe( res );
    zippedSubsStream.finalize();
  }

};

const singleSubHeaders = file => ({
  'Content-disposition': `attachment; filename=${file.subname}`,
  'Content-type'       : file.mimetype
});

const multipleSubsHeaders = () => ({
  'Content-disposition': `attachment; filename=fixsubs-${Date.now()}.zip`,
  'Content-type'       : 'application/zip'
});


const appendSubFileToArchive = ( archive, files ) => reduce( appenedFileReducer, archive )( files );

const appenedFileReducer = ( archiveStream, { translated, subname: name } ) => archiveStream.append( translated, { name } );

const addTranslatedSubFileName = file => {
  let originalFile = parsePath( file.originalname );
  let filename     = endsWithArLanguage( originalFile.name ) ? originalFile.name : `${originalFile.name}.AR`;
  return { ...file, subname: `${filename}${originalFile.ext}` };
};

export const downloadMW = downloadMWFactory( archiver );
