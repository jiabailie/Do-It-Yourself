# Build RESTful Service with Java Spring

## Why REST?
REST embraces the precepts of the web, including its architecture, benefits, and everything else.

## What benefits?
The web and its core protocal, HTTP, provide a stack of features:
 - Sutiable actions (GET, POST, PUT, DELETE)
 - Caching
 - Redirection and forwarding
 - Security (encryption and authentication)

Developers are able to draw upon 3rd party toolkits that implement these diverse specs and instantly have both client and server technology at their fingertips.

By building on top of HTTP, REST APIs provide the means to build:
 - Backwards compatible APIs
 - Evolvable APIs
 - Scaleable Services
 - Securable Services
 - A spectrum of stateless to stateful services

## Getting Started

As we work through this tutorial, we'll use [Spring Boot](https://spring.io/projects/spring-boot).
Go to [Spring Initializr](https://start.spring.io/) and add the following dependencies to the project.
 - Web
 - JPA

Change the Name to "WheelPlanet" and then choose "Generate". A ***.zip*** will download. Unzip it, Inside you'll find a simple, Maven-based project including a ***pom.xml*** build file. (NOTE: You can also use Gradle. This example will use Maven.)

Spring Boot can work with any IDE. You can use Eclipse, Intellij IDEA, Netbeans, etc.

## Run the Service

The example is one basic version of Spring Boot RESTful service, you can add more endpoints in the controller.

You can use make commands to build or run the serivce.
```shell
# build the service as .jar
make build

# build the service as .jar and execute the service with .jar
make run-jar

# run the service directly without build the .jar
make run
```

## Usage Example

Let's try to run the service and call the endpoint ***getExplorerTopic***.

```shell
yangruiguo@192 ~ % curl -v http://localhost:8080/explorer/restful-service
*   Trying 127.0.0.1:8080...
* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /explorer/restful-service HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.88.1
> Accept: */*
>
< HTTP/1.1 200
< Content-Type: text/plain;charset=UTF-8
< Content-Length: 64
< Date: Wed, 23 Aug 2023 02:55:53 GMT
<
* Connection #0 to host localhost left intact
Welcome to WheelPlanet. Let's discuss the topic restful-service.%
yangruiguo@192 ~ %
```