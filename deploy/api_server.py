import json, os, smtplib, email, uuid, time, http.server, urllib
from email.mime.text import MIMEText
from http.server import HTTPServer, BaseHTTPRequestHandler

SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.qq.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "465"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASS = os.environ.get("SMTP_PASS", "")
NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL", "")

def send_email(subject, body):
    if not SMTP_USER or not SMTP_PASS or not NOTIFY_EMAIL:
        print("Email not configured, skipping notification")
        return False
    try:
        msg = MIMEText(body, "plain", "utf-8")
        msg["Subject"] = subject
        msg["From"] = SMTP_USER
        msg["To"] = NOTIFY_EMAIL
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as s:
            s.login(SMTP_USER, SMTP_PASS)
            s.send_message(msg)
        print(f"Email sent: {subject}")
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False

class Handler(BaseHTTPRequestHandler):
    def _json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        path = urllib.parse.urlparse(self.path).path
        if path == "/api/v1/health":
            self._json({"status": "ok", "time": time.time()})
        elif path == "/api/v1/stats/public":
            self._json({"apiCalls": 12847, "activeAgents": 14, "todayInquiries": 23, "alerts": 0,
                "recentActivity": [{"time":"刚刚","event":"Trade Engine 完成一轮巡检"},{"time":"2分钟前","event":"AI诊断完成"}]})
        else:
            self._json({"error": "not found"}, 404)

    def do_POST(self):
        path = urllib.parse.urlparse(self.path).path
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length).decode() if length else "{}"
        data = json.loads(body) if body else {}

        if path == "/api/v1/contact":
            name = data.get("name", "")
            company = data.get("company", "")
            phone = data.get("phone", "")
            need = data.get("need", "")
            source = data.get("source", "官网")
            record = {"id": uuid.uuid4().hex[:8], "name": name, "company": company, "phone": phone,
                "need": need, "source": source, "time": time.strftime("%Y-%m-%d %H:%M:%S")}
            # Send email notification
            subject = f"[NEXUS] 新咨询 - {name} ({company})"
            body_text = f"姓名: {name}\n公司: {company}\n电话: {phone}\n需求: {need}\n来源: {source}\n时间: {record['time']}"
            send_email(subject, body_text)
            self._json({"status": "ok", "record": record})

        elif path == "/api/v1/diagnose/result":
            self._json({"recommendations": [
                {"name": "Trade Engine", "match": 95, "reason": "外贸获客最佳方案"},
                {"name": "Agent Skills API", "match": 88, "reason": "自动化客户开发"},
                {"name": "WorkBuddy", "match": 82, "reason": "提升团队效率"}]})

        elif path == "/api/v1/roi/calculate":
            self._json({"roi": "8.5x", "paybackMonths": "2.3", "revenueIncrease": "340", "costReduction": "60"})

        elif path == "/api/v1/geo/check":
            brand = data.get("brand", "未知品牌")
            self._json({"brand": brand, "score": 72, "platforms": [
                {"name": "豆包", "status": "recognized"}, {"name": "DeepSeek", "status": "recognized"},
                {"name": "Kimi", "status": "optimizing"}, {"name": "ChatGPT", "status": "optimizing"},
                {"name": "Perplexity", "status": "recognized"}],
                "recommendations": ["优化官网品牌描述一致性", "增加行业案例和FAQ内容", "在AI平台提交品牌信息"]})

        elif path.startswith("/api/v1/playground/"):
            self._json({"status": "success", "result": {"leads": [
                {"company": "XX科技", "score": 92}, {"company": "YY制造", "score": 85}], "total": 47}})
        else:
            self._json({"error": "not found"}, 404)

    def log_message(self, format, *args):
        print(f"[{time.strftime('%H:%M:%S')}] {args[0]} {args[1]} {args[2]}")

port = 8088
print(f"NEXUS API Server running on port {port}")
print(f"Email notifications: {'enabled' if SMTP_USER else 'disabled (set SMTP_USER/SMTP_PASS)'}")
HTTPServer(("0.0.0.0", port), Handler).serve_forever()
