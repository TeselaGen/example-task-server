const S3rver = require("s3rver");
const path = require("path");
const fse = require("fs-extra");
const Promise = require("bluebird");
const killPort = require("kill-port");

const AWS = require("aws-sdk");

const s3DataDirectory = path.resolve(__dirname, "../../s3-data");

fse.ensureDirSync(s3DataDirectory);

async function initLocalS3(app, appConfig) {
  console.log(`Checking to see if local s3 server needed`);
  if (process.env.LOCAL_S3) {
    console.log(`Initializing local s3 server`);
    let config = await startLocalS3Server();
    await createBucket(config);
    setEnvVars(config);
    console.log(`Finished initializing local s3 server`);
    console.log(config);
    console.log(`AWS_ACCESS_KEY: ${process.env.AWS_ACCESS_KEY}`);
  }
}

async function startLocalS3Server() {
  let config = {
    port: process.env.LOCAL_S3_PORT || 4578,
    hostname: "localhost",
    directory: s3DataDirectory,
    silent: false
  };

  let server = new S3rver(config);

  console.log(`Killing any processes on port: ${config.port}`);
  await killPort(config.port);

  console.log(`Starting local S3 server on port: ${config.port}`);

  return new Promise((resolve, reject) => {
    server.run(err => {
      if (err) {
        reject(err);
      } else {
        console.log(`Local S3 server started!`);
        resolve({
          ...config,
          endpoint: `http://${config.hostname}:${config.port}`,
          sslEnabled: false,
          s3ForcePathStyle: true,
          accessKeyId: "123",
          secretAccessKey: "abc",
          bucket: "queue-files"
        });
      }
    });
  });
}

async function createBucket(config) {
  const {
    accessKeyId,
    secretAccessKey,
    endpoint,
    sslEnabled,
    s3ForcePathStyle
  } = config;

  s3Client = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    endpoint,
    sslEnabled,
    s3ForcePathStyle
  });

  console.log(`Creating bucket: ${config.bucket}`);
  let result = await s3Client
    .createBucket({ Bucket: config.bucket })
    .promise()
    .catch(err => {
      if (err.code !== "BucketAlreadyExists") throw err;
    });
  console.log(`Created bucket: ${config.bucket}`);
}

function setEnvVars(config) {
  process.env.AWS_S3_BUCKET = config.bucket;
  process.env.AWS_S3_ENDPOINT = config.endpoint;
  process.env.AWS_S3_FORCE_PATH_STYLE = config.s3ForcePathStyle;
  process.env.AWS_ACCESS_KEY = config.accessKeyId;
  process.env.AWS_SECRET_KEY = config.secretAccessKey;
}

function thunkToPromise(fn) {
  return new Promise((resolve, reject) => {
    fn((err, ...args) => {
      if (err) return reject(err);
      resolve(args.length > 1 ? args : args[0]);
    });
  });
}

module.exports = { initLocalS3 };
