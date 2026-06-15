import os
import re
import json
import time
import uuid
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

PORT = 3001
DATA_FILE = "datos.json"
UPLOAD_DIR = "uploads"

class APIRequestHandler(SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_GET(self):
        parsed_url = urlparse(self.path)
        if parsed_url.path.endswith("api.php"):
            query = parse_qs(parsed_url.query)
            action = query.get("action", [""])[0]
            
            if action == "get":
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                
                if os.path.exists(DATA_FILE):
                    with open(DATA_FILE, "r", encoding="utf-8") as f:
                        self.wfile.write(f.read().encode("utf-8"))
                else:
                    self.wfile.write(json.dumps({"status": "error", "message": "No hay datos guardados"}).encode("utf-8"))
                return
            
        return super().do_GET()

    def do_POST(self):
        parsed_url = urlparse(self.path)
        if parsed_url.path.endswith("api.php"):
            query = parse_qs(parsed_url.query)
            action = query.get("action", [""])[0]
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            
            content_length = int(self.headers.get("Content-Length", 0))
            
            if action == "save":
                body = self.rfile.read(content_length)
                try:
                    data = json.loads(body.decode("utf-8"))
                    with open(DATA_FILE, "w", encoding="utf-8") as f:
                        json.dump(data, f, ensure_ascii=False, indent=4)
                    self.wfile.write(json.dumps({"status": "ok", "message": "Datos guardados correctamente"}).encode("utf-8"))
                except Exception as e:
                    self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
                return
                
            elif action == "upload":
                content_type = self.headers.get("Content-Type", "")
                if "boundary=" not in content_type:
                    self.wfile.write(json.dumps({"status": "error", "message": "Falta multipart boundary"}).encode("utf-8"))
                    return
                
                boundary = content_type.split("boundary=")[1].encode("utf-8")
                body = self.rfile.read(content_length)
                
                parts = body.split(b"--" + boundary)
                filename = None
                file_data = None
                
                for part in parts:
                    if b"filename=" in part:
                        header_part, file_content = part.split(b"\r\n\r\n", 1)
                        if file_content.endswith(b"\r\n"):
                            file_content = file_content[:-2]
                        
                        match = re.search(r'filename="([^"]+)"', header_part.decode("utf-8", errors="ignore"))
                        if match:
                            filename = match.group(1)
                            file_data = file_content
                            break
                
                if filename and file_data:
                    ext = filename.split(".")[-1].lower()
                    if ext not in ["jpg", "jpeg", "png", "webp", "gif"]:
                        self.wfile.write(json.dumps({"status": "error", "message": "Extensión no permitida"}).encode("utf-8"))
                        return
                    
                    safe_name = f"{int(time.time())}_{uuid.uuid4().hex[:8]}.{ext}"
                    os.makedirs(UPLOAD_DIR, exist_ok=True)
                    
                    filepath = os.path.join(UPLOAD_DIR, safe_name)
                    with open(filepath, "wb") as f:
                        f.write(file_data)
                    
                    url = f"{UPLOAD_DIR}/{safe_name}"
                    self.wfile.write(json.dumps({"status": "ok", "url": url}).encode("utf-8"))
                else:
                    self.wfile.write(json.dumps({"status": "error", "message": "No se encontró el archivo en la petición"}).encode("utf-8"))
                return
                
        # For standard POST, fallback
        self.send_response(405)
        self.end_headers()

if __name__ == "__main__":
    print(f"Iniciando servidor de desarrollo en http://localhost:{PORT}")
    server = HTTPServer(("0.0.0.0", PORT), APIRequestHandler)
    server.serve_forever()
