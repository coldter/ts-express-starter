/* eslint-disable */
import 'jest-extended';

declare global {
  var testRequest: import('supertest').SuperTest<import('supertest').Test>;
  var db: import('@database/index').Db;
}

export {};
