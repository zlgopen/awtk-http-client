# awtk-http-client

### 1. 编译：

1. 获取 awtk 并编译

```
git clone https://github.com/zlgopen/awtk.git
cd awtk; scons; cd -
```

2. 获取 awtk-http-client 并编译
```
git clone https://github.com/zlgopen/awtk-http-client.git
cd awtk-http-client; scons
```

### 2. 运行 Demo：

* HTTP 请求的 demo

```
./bin/demo_http
```

### 3. 基本用法

目前实现了 GET/POST/DELETE/PUT 四种方法，可以满足常见的 REST API 调用。但不适合大文件传输和同时大量并发请求。

**接受事件的回调函数的原型：**

```
typedef ret_t (*http_request_on_event_t)(void* ctx, http_request_t* request, http_response_t* resp);
```

**发起请求的函数：**

```
ret_t http_request(http_request_t* request);
```

如：

```c
  request = http_request_create_get(url, on_http_event, widget);
  http_request(request);

```

以下几点值得注意：

* resp->done 为 TRUE 表示请求成功完成。
* resp->fail 为 TRUE 表示请求失败。
* resp->done 或者 resp->fail 为 TRUE 表示请求完成了，此时才可以释放 request 对象。
* resp->body 是返回的内容。
* resp->body_size 是返回的内容的长度。
* resp->status_code 是 HTTP 响应码。
* resp->header 是响应头。
* 设置 request->abort 标志来取消请求，取消请求是异步。

> 具体用法请参考：demos/demo_http.c 
