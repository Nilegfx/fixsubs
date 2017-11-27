import { decode } from 'iconv-lite';
import { default as detectCharacterEncoding } from 'detect-character-encoding';
import { default as isEmpty } from 'lodash/fp/isEmpty';
import { default as map } from 'lodash/fp/map';

const ARABIC_ENCODING = 'WINDOWS-1256';
const UTF8_ENCODING   = 'UTF-8';
const equalEncodings  = origEncoding => fileEncoding => origEncoding !== fileEncoding;
const shouldDecode    = equalEncodings( UTF8_ENCODING );

export const translateMW = ( req, res, next ) => {

  if ( !isEmpty( req.files ) ) {
    req.files = map(translateFile)(req.files);
    return next();
  }

  return res.status( 400 ).send( 'file type mismatch' );

}


const translateFile = file => {

  let currentEncode = detectCharacterEncoding( file.buffer ).encoding;

  if ( shouldDecode(currentEncode) ) {
    let translated = decode( file.buffer, ARABIC_ENCODING );
    let decoded = true;
    return {...file, translated, decoded};
  } else {
    let translated = file.buffer.toString();
    let decoded    = false;
    return {...file, translated, decoded};
  }

}
