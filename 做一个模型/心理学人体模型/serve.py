# 本地启动器：双击启动.bat 会调用它（也可以手动运行 python serve.py）。
# 相比 python -m http.server 多做了三件事：
#   1) 8123 端口被别的窗口（比如旧版本没关的服务器）占着时，换一个端口并提示，
#      不会悄悄打开旧版本；
#   2) 禁止浏览器缓存，文件更新后刷新就是新版；
#   3) 固定 .js / .glb 的类型，避免个别 Windows 注册表配置导致模块加载失败。
import functools
import http.server
import os
import socket
import sys
import time
import webbrowser

ROOT = os.path.dirname(os.path.abspath(__file__))
PREFERRED_PORT = 8123   # 网页里保存的修改按端口区分，平时尽量用这个端口


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.glb': 'model/gltf-binary',
    }

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def log_message(self, *args):
        pass   # 不在窗口里刷访问日志


class Server(http.server.ThreadingHTTPServer):
    # Windows 上 SO_REUSEADDR 会让两个服务器同时"占住"同一端口，所以只在其他系统上开启
    allow_reuse_address = os.name != 'nt'


def port_in_use(port):
    with socket.socket() as s:
        s.settimeout(0.3)
        return s.connect_ex(('127.0.0.1', port)) == 0


def start_server():
    handler = functools.partial(Handler, directory=ROOT)
    for port in range(PREFERRED_PORT, PREFERRED_PORT + 50):
        if port_in_use(port):
            continue
        try:
            return Server(('127.0.0.1', port), handler), port
        except OSError:
            continue
    return None, None


def main():
    httpd, port = start_server()
    if not httpd:
        print(f'启动失败：{PREFERRED_PORT} 附近的端口都被占用了。')
        return 1
    if port != PREFERRED_PORT:
        print(f'⚠ {PREFERRED_PORT} 端口已被占用——很可能是之前打开的服务器窗口还没关，')
        print(f'  那个窗口提供的可能是旧版本。本次改用 {port} 端口打开当前文件夹里的版本。')
        print(f'  注意：在 {PREFERRED_PORT} 端口网页里保存的修改，在新端口看不到。')
        print(f'  把其他黑色窗口都关掉、再双击启动，就会回到 {PREFERRED_PORT} 端口。\n')

    # 网址带上时间戳：浏览器里存着的旧版 index.html 不会被拿来用
    url = f'http://localhost:{port}/index.html?v={int(time.time())}'
    print(f'已启动：{url}')
    print(f'文件夹：{ROOT}')
    print('看完直接关掉这个窗口即可。')
    webbrowser.open(url)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    return 0


if __name__ == '__main__':
    sys.exit(main())
