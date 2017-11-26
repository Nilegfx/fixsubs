import { decode } from 'iconv-lite';
import { default as detectCharacterEncoding } from 'detect-character-encoding';
import { default as isEmpty } from 'lodash/fp/isEmpty';

const ARABIC_ENCODING = 'WINDOWS-1256';
const UTF8_ENCODING   = 'UTF-8';
const equalEncodings  = origEncoding => fileEncoding => origEncoding !== fileEncoding;
const shouldDecode    = equalEncodings( UTF8_ENCODING );

export const translateMW = ( req, res, next ) => {

  if ( !isEmpty( req.file ) ) {
    let file          = req.file
    let currentEncode = detectCharacterEncoding( file.buffer ).encoding;

    if ( shouldDecode(currentEncode) ) {
      req.file.translated = decode( file.buffer, ARABIC_ENCODING );
      req.file.decoded    = false;
    } else {
      req.file.decoded    = true;
      req.file.translated = file.buffer.toString();
    }

    return next();
  }

  return res.status( 400 ).send( 'file type mismatch' );

}
