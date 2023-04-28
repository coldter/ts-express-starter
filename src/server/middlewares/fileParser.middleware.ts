import multer from 'multer';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { resolve } from 'path';
import { customAlphabet } from 'nanoid';
import * as mime from 'mime-types';
import { BadRequest } from '@exceptions/HttpException';
import { FileMimeType } from '@interfaces/app/common.interface';
import { MAX_UPLOAD_FILE_SIZE_IN_MB } from '@constants/common.constants';

const fileNameAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const generatedFileName = customAlphabet(fileNameAlphabet, 16);

/**
 * File parser middleware for single file upload
 * @param formFieldName
 * @param uploadFileTypes
 * @param uploadPath
 * @param skipFileCheckIfPresent
 * @returns RequestHandler
 */
export const fileParserLocalStorage = (
  formFieldName: string,
  uploadFileTypes: FileMimeType[],
  uploadPath: string,
  skipFileCheckIfPresent: Array<string> = [], // if given field is present in the body, skip file check
): RequestHandler => {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, resolve(uploadPath));
    },
    filename: (_req, file, cb) => {
      const fileName = generatedFileName();
      const ext = mime.extension(file.mimetype);
      cb(null, `${fileName}.${ext}`);
    },
  });

  const upload = multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * MAX_UPLOAD_FILE_SIZE_IN_MB,
    },
  });

  // * middleware
  return (req: Request, res: Response, next: NextFunction): void => {
    upload.single(formFieldName)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            next(new BadRequest(`File size should be less than ${MAX_UPLOAD_FILE_SIZE_IN_MB}MB`));
            return;
          }
        }
        next(err);
      }

      if (!req.file) {
        const bodyFieldNames = Object.keys(req.body);
        // * this is a workaround for skipping file check if the skip-able field is present in the body
        for (let i = 0; i < skipFileCheckIfPresent.length; i += 1) {
          if (bodyFieldNames.includes(skipFileCheckIfPresent[i])) {
            if (req.body[skipFileCheckIfPresent[i]] === '') {
              next(
                new BadRequest(`${skipFileCheckIfPresent[i]} is not allowed to be empty string`),
              );
              return;
            }

            next();
            return;
          }
        }

        next(new BadRequest('File is required'));
        return;
      }

      if (!uploadFileTypes.includes(req.file.mimetype as FileMimeType)) {
        next(new BadRequest('Invalid file type'));
        return;
      }

      next();
    });
  };
};
