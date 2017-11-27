import { default as parsePath } from 'parse-filepath';
import { default as includes } from 'lodash/fp/includes';
import { default as negate } from 'lodash/fp/negate';
import { default as isEmpty } from 'lodash/fp/isEmpty';

const isNotEmpty = negate(isEmpty);

const subsExtensions = [
  ".txt",
  ".aqt",
  ".gsub",
  ".jss",
  ".pjs",
  ".psb",
  ".rt",
  ".smi",
  ".srt",
  ".ssa",
  ".ass",
  ".ssf",
  ".stl",
  ".sub",
  ".idx",
  ".ttxt",
  ".usf"
];

const shouldAllowExtension = extensions => extension => includes( extension, extensions );
const isSubtitle           = shouldAllowExtension( subsExtensions );

export const allowSubsOnly = ( req, file, cb ) => {
  let { ext } = parsePath( file.originalname );
  let isSubExt    = isSubtitle( ext );

  cb( null, isSubExt );
};

export const isSingular = payload => isNotEmpty( payload ) && payload.length < 2
