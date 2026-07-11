 # VPS 一键初始化脚本 (Ubuntu/Debian)
 # 用法: .\scripts\init-vps.ps1 -VpsHost "你的VPS_IP" -SshUser "root"
 # 前提: 本地已配置好 SSH 密钥
 param(
     [Parameter(Mandatory=$true)]
     [string]$VpsHost,
     [Parameter(Mandatory=$true)]
     [string]$SshUser
 )
 $script = @'
 #!/bin/bash
 set -e
 echo "========================================"
 echo "  VPS 一键初始化"
 echo "========================================"
 echo ""
 echo "[1/5] 更新系统..."
 apt update && apt upgrade -y
 echo ""
 echo "[2/5] 安装 Docker..."
 curl -fsSL https://get.docker.com | sh
 usermod -aG docker $USER
 echo ""
 echo "[3/5] 安装 Docker Compose..."
 curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
 chmod +x /usr/local/bin/docker-compose
 echo ""
 echo "[4/5] 配置 UFW 防火墙..."
 ufw default deny incoming
 ufw default allow outgoing
 ufw allow 22/tcp
 ufw allow 80/tcp
 ufw allow 443/tcp
 ufw allow 8000/tcp
 ufw --force enable
 echo ""
 echo "[5/5] 设置时区..."
 timedatectl set-timezone Asia/Shanghai
 echo ""
 echo "========================================"
 echo "  VPS 初始化完成！请重新登录以应用 Docker 权限变更。"
 echo "========================================"
 '@
 $script | ssh -o StrictHostKeyChecking=no "$SshUser@$VpsHost" "sudo bash"
