function Http() {}


Http.onResult = function(handle, statusCode, statusText, content) {
  if(!(Http._onResult)) {
    Http._onResult = Module.cwrap('awtk_http_on_result', 'number', 
      ['number', 'number', 'string', 'string']);
  }

  return Http._onResult(handle, statusCode, statusText, content);
}

Http.request = function(handle, _method, _url, _headers, _data, size) {
  const method = pointerToString(_method);
  const url = pointerToString(_url);
  const headers = pointerToString(_headers);
  const data = pointerToString(_data);

  function onreadystatechange() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      Http.onResult(handle, httpRequest.status, httpRequest.statusText, httpRequest.responseText);
    }
  }

  httpRequest = new XMLHttpRequest();
  httpRequest.withCredentials = true;
  httpRequest.onreadystatechange = onreadystatechange;
  httpRequest.onprogress = function () {
      console.log('LOADING', httpRequest.readyState); 
  };

  httpRequest.onload = function () {
      console.log('DONE', httpRequest.readyState); 
  };

  try {
    httpRequest.open(method, url);
  }catch(e) {
    alert(e);
  }

  if (headers) {
    for(key in headers) {
      httpRequest.setRequestHeader(key, headers[key]);
    }
  }

  try {
    if(data) {
      const content = "test";
      httpRequest.send(content);
    } else {
      httpRequest.send();
    }
  } catch(e) {
    console.log(e);
  }

  return;
}

