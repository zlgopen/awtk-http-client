#include "tkc/types_def.h"
#include "http/http_request.h"

#ifdef AWTK_WEB
#include <emscripten.h>

ret_t awtk_http_on_result(http_request_t* request, int status_code, 
    const char* status_text, const char* content) {
  http_response_t* response = request->response;

  if(request->on_event) {
    http_response_set_done(response, TRUE);
    http_response_set_status_code(response, status_code);
    if(content != NULL) {
      http_response_append_body_data(response, content, strlen(content));
      http_response_set_done(response, TRUE);
    } else {
      http_response_set_fail(response, TRUE);
    }

    request->on_event(request->on_event_ctx, request);
  }

  log_debug("on_result:%s\n", status_text);
  return RET_OK;
}

ret_t http_request(http_request_t* request) {
  const char* headers = "{}";

  ret_t ret = EM_ASM_INT({ return Http.request($0, $1, $2, $3, $4, $5); }, 
      request, 
      request->method,
      request->url,
      headers,
      request->body,
      request->body_size);

  return RET_OK;
}

ret_t http_init(void) {
  return RET_OK;
}

ret_t http_deinit(void) {
  return RET_OK;
}
#endif/*AWTK_WEB*/
