import os
import sys
import platform
OS_NAME = platform.system();

sys.path.insert(0, '../awtk/')
#sys.path.insert(0, '../awtk-linux-fb/')
import awtk_config as awtk

APP_ROOT    = os.path.normpath(os.getcwd())
APP_SRC     = os.path.join(APP_ROOT, 'src')
APP_BIN_DIR = os.path.join(APP_ROOT, 'bin')
APP_LIB_DIR = os.path.join(APP_ROOT, 'lib')

APP_CPPPATH = ['.', 
  os.path.join(APP_ROOT, '3rd/tls/mbedtls/crypto/include/'),
  os.path.join(APP_ROOT, '3rd/tls/mbedtls/include'),
  os.path.join(APP_ROOT, '3rd/zlib/zlib'),
  os.path.join(APP_ROOT, '3rd/curl/curl/lib'),
  os.path.join(APP_ROOT, '3rd/curl/curl/include'),
  os.path.join(APP_ROOT, 'src')
]
os.environ['APP_SRC'] = APP_SRC;
os.environ['APP_ROOT'] = APP_ROOT;
os.environ['BIN_DIR'] = APP_BIN_DIR;
os.environ['LIB_DIR'] = APP_LIB_DIR;

APP_CCFLAGS = ' -DBUILDING_LIBCURL -DWITH_CURL '

if OS_NAME == 'Windows':
  APP_CCFLAGS = APP_CCFLAGS + ' -D_WIN32 '
elif OS_NAME == 'Darwin':
  APP_CCFLAGS = APP_CCFLAGS + ' -DHAVE_CONFIG_H '
elif OS_NAME == 'Linux':
  APP_CCFLAGS = APP_CCFLAGS + ' -DHAVE_CONFIG_H '

APP_LIBS = ['assets', 'z', 'tls']
APP_LIBPATH = [APP_LIB_DIR]
APP_LINKFLAGS = ''


if hasattr(awtk, 'CC'):
  DefaultEnvironment(
    CC=awtk.CC,
    CXX=awtk.CXX,
    LD=awtk.LD,
    AR=awtk.AR,
    STRIP=awtk.STRIP,
    CPPPATH   = awtk.CPPPATH + APP_CPPPATH,
    LINKFLAGS = awtk.LINKFLAGS + APP_LINKFLAGS,
    LIBS      = APP_LIBS + awtk.LIBS,
    LIBPATH   = APP_LIBPATH + awtk.LIBPATH,
    CCFLAGS   = APP_CCFLAGS + awtk.CCFLAGS, 
    OS_SUBSYSTEM_CONSOLE=awtk.OS_SUBSYSTEM_CONSOLE,
    OS_SUBSYSTEM_WINDOWS=awtk.OS_SUBSYSTEM_WINDOWS)
else:
  DefaultEnvironment(
    CPPPATH   = awtk.CPPPATH + APP_CPPPATH,
    LINKFLAGS = awtk.LINKFLAGS + APP_LINKFLAGS,
    LIBS      = APP_LIBS + awtk.LIBS,
    LIBPATH   = APP_LIBPATH + awtk.LIBPATH,
    CCFLAGS   = APP_CCFLAGS + awtk.CCFLAGS, 
    OS_SUBSYSTEM_CONSOLE=awtk.OS_SUBSYSTEM_CONSOLE,
    OS_SUBSYSTEM_WINDOWS=awtk.OS_SUBSYSTEM_WINDOWS)

SConscriptFiles=[
  '3rd/zlib/SConscript', 
  '3rd/tls/SConscript', 
  '3rd/curl/SConscript', 
  'src/http/SConscript', 
  'tests/SConscript', 
  'demos/SConscript'
]


SConscript(SConscriptFiles)

