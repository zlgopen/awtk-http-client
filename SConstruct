import os
import platform
import scripts.app_helper as app

helper = app.Helper(ARGUMENTS);

OS_NAME = platform.system();
APP_ROOT=helper.APP_ROOT
APP_CPPPATH = ['.', 
  os.path.join(APP_ROOT, '3rd/tls/mbedtls/include'),
  os.path.join(APP_ROOT, '3rd/zlib/zlib'),
  os.path.join(APP_ROOT, '3rd/curl/curl/lib'),
  os.path.join(APP_ROOT, '3rd/curl/curl/include'),
  os.path.join(APP_ROOT, 'src')
]

APP_CCFLAGS = ' -DBUILDING_LIBCURL -DWITH_CURL '
if OS_NAME == 'Windows':
  APP_CCFLAGS = APP_CCFLAGS + ' -D_WIN32 '
elif OS_NAME == 'Darwin':
  APP_CCFLAGS = APP_CCFLAGS + ' -DHAVE_CONFIG_H '
elif OS_NAME == 'Linux':
  APP_CCFLAGS = APP_CCFLAGS + ' -DHAVE_CONFIG_H '

helper.add_libs(['z', 'tls']).add_cpppath(APP_CPPPATH).set_ccflags(APP_CCFLAGS).call(DefaultEnvironment)

SConscriptFiles=[
  '3rd/zlib/SConscript', 
  '3rd/tls/SConscript', 
  '3rd/curl/SConscript', 
  'src/http/SConscript', 
  'tests/SConscript', 
  'demos/SConscript'
]

SConscript(SConscriptFiles)

