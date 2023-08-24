# Build a RESTful API with Go and Gin

This tutorial introduces the basics of writing a RESTful web service API with Go and the [Gin Web Framework](https://gin-gonic.com/docs/).

Gin simplifies many coding tasks associated with building web applications, including web services. In this tutorial, you'll use Gin to route requests, retrieve request details, and marshal JSON for responses.

In this tutorial, you will build a RESTful API server with three endpoints.

## Tips
In China, we cannot download github.com/gin-gonic/gin module and some dependencies through ***go get .***, we can try to add below environment variable to the runtime environment to download the dependencies.
```shell
export GOROOT=/usr/local/go
export GOBIN=$GOROOT/bin
export GO111MODULE=on
export GOPROXY=https://mirrors.aliyun.com/goproxy/,direct
```

## Run the Service

From the command line in the directory containing main.go, run the code. Use a dot argument to mean “run code in the current directory.”

```shell
yangruiguo@192 wheelplanet % go run .
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:	export GIN_MODE=release
 - using code:	gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET    /albums                   --> main.getAlbums (3 handlers)
[GIN-debug] GET    /albums/:id               --> main.getAlbumByID (3 handlers)
[GIN-debug] POST   /albums                   --> main.postAlbums (3 handlers)
[GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
[GIN-debug] Listening and serving HTTP on localhost:8080
```

Then we can use ***curl*** commands to call the endpoints, blow lines show the result.

```shell
yangruiguo@192 ~ % curl http://localhost:8080/albums
[
    {
        "id": "1",
        "title": "Blue Train",
        "artist": "John Coltrane",
        "price": 56.99
    },
    {
        "id": "2",
        "title": "Jeru",
        "artist": "Gerry Mulligan",
        "price": 17.99
    },
    {
        "id": "3",
        "title": "Sarah Vaughan and Clifford Brown",
        "artist": "Sarah Vaughan",
        "price": 39.99
    }
]
yangruiguo@192 ~ % curl http://localhost:8080/albums \
    --include \
    --header "Content-Type: application/json" \
    --request "POST" \
    --data '{"id": "4","title": "The Modern Sound of Betty Carter","artist": "Betty Carter","price": 49.99}'
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
Date: Thu, 24 Aug 2023 10:42:49 GMT
Content-Length: 116

{
    "id": "4",
    "title": "The Modern Sound of Betty Carter",
    "artist": "Betty Carter",
    "price": 49.99
}
yangruiguo@192 ~ % curl http://localhost:8080/albums \
    --header "Content-Type: application/json" \
    --request "GET"
[
    {
        "id": "1",
        "title": "Blue Train",
        "artist": "John Coltrane",
        "price": 56.99
    },
    {
        "id": "2",
        "title": "Jeru",
        "artist": "Gerry Mulligan",
        "price": 17.99
    },
    {
        "id": "3",
        "title": "Sarah Vaughan and Clifford Brown",
        "artist": "Sarah Vaughan",
        "price": 39.99
    },
    {
        "id": "4",
        "title": "The Modern Sound of Betty Carter",
        "artist": "Betty Carter",
        "price": 49.99
    }
]
yangruiguo@192 ~ %
```