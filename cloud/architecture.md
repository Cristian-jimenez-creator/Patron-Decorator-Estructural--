# Cloud Deployment

Frontend:
- Static website hosted on Amazon S3.

Backend:
- API Gateway receives HTTP requests.
- AWS Lambda executes reservation logic.
- Decorator classes calculate the final ticket price.

Flow:

Browser -> S3 Frontend -> API Gateway -> Lambda -> Decorator -> Response

The local Express server is included for classroom demonstration without requiring AWS credentials.
