import { default as multer, memoryStorage } from 'multer';
import { allowSubsOnly as fileFilter } from '../utils';

const storage = memoryStorage();
const limits  = { fileSize: 1000000 };

export const uploadMW = multer( { storage, fileFilter, limits } ).single( 'subtitle' );
