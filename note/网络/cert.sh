# 数字证书生成命令
# 私钥: cert.key
# 证书/公钥: cert.crt
# ps: window环境需要把'/' 改成'//'
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout cert.key -out cert.crt