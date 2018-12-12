const S3rver = require("s3rver");
const path = require("path");
const fse = require("fs-extra");
const Promise = require("bluebird");

const AWS = require("aws-sdk");

const s3DataDirectory = path.resolve(__dirname, "../../s3-data");

fse.ensureDirSync(s3DataDirectory);

async function initLocalS3(app, appConfig) {
  if (process.env.LOCAL_S3) {
    let config = await startLocalS3Server();
    await createBucket(config);
    setEnvVars(config);
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

  return new Promise((resolve, reject) => {
    server.run(err => {
      if (err) {
        reject(err);
      } else {
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
  await s3Client
    .createBucket({ Bucket: config.bucket })
    .promise()
    .catch(err => {
      if (err.code !== "BucketAlreadyExists") throw err;
    });
}

function setEnvVars(config) {
  process.env.AWS_S3_BUCKET = config.bucket;
  process.env.AWS_S3_ENDPOINT = config.endpoint;
  process.env.AWS_S3_FORCE_PATH_STYLE = config.s3ForcePathStyle;
  process.env.AWS_ACCESS_KEY = config.accessKeyId;
  process.env.AWS_SECRET_KEY = config.secretAccessKey;
}

module.exports = { initLocalS3 };
