export const config = {
  "dev": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASS,
    "database": process.env.POSTGRES_DB,
    "host": process.env.POSTGRES_HOST,
    "dialect": "postgres",
    "aws_region": process.env.APP_AWS_REG,
    "aws_media_bucket": process.env.APP_BUCKET,
    "aws_profile": process.env.APP_AWS_PROF,
    "jwt_secret": process.env.APP_JWT_SECRET
  },
  "prod": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASS,
    "database": process.env.POSTGRES_DB,
    "host":     process.env.POSTGRES_HOST,
    "dialect":  "postgres",
    "aws_region": process.env.APP_AWS_REG,
    "aws_media_bucket": process.env.APP_BUCKET,
    "aws_profile": process.env.APP_AWS_PROF,
    "jwt_secret": process.env.APP_JWT_SECRET
  }
}
