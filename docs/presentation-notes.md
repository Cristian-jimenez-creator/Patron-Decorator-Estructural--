# Presentation Notes

## Project
A low-cost flight reservation platform where users choose a Basic ticket and add optional services.

## Main pattern
The project uses the Decorator Pattern.

BasicTicket is the base component. Each additional service is a decorator that wraps the previous ticket and adds its own price and description.

Example:

BasicTicket ($180,000)
+ CheckedBaggageDecorator ($70,000)
+ CarryOnDecorator ($40,000)
= $290,000

## Why Decorator?
We can add or remove optional services without changing the BasicTicket class.

## Frontend
The user selects a flight, enters passenger information, chooses services and sees the estimated price.

## Backend
The server receives the selected services and calculates the final price again. This prevents the browser from being the only source of truth.

## Cloud
The frontend can be hosted in S3. The backend calculation can run in AWS Lambda behind API Gateway.
