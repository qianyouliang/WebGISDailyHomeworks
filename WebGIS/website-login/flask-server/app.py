from flask import Flask,jsonify, request,render_template,make_response
import pymysql
from flask_cors import CORS #解决跨域问题
import json
import jwt
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)  # 允许所有来源的跨域请求
#CORS(app, origins='http://127.0.0.1:5143') #允许单个来源的跨域请求
conn = pymysql.connect(
    host='localhost', 
    port=3306,
    user='root', 
    password='noahp13830986400', 
    db='webgis', 
    charset='utf8'
    )
#token配置
payload = {
    'exp': datetime.now() + timedelta(days=7),  # 令牌过期时间
    'username': 'qianyouliang' # 想要传递的信息,如用户名ID
}
key = 'SECRET_KEY'

#登录用户
@app.route('/login',methods=["POST"])
def login():
    # 获取请求中的参数
    data = request.get_data()  # 获取原始的请求数据
    data_str = data.decode("utf-8")  # 将字节字符串解码为普通字符串
    data_dict = json.loads(data_str)  # 使用 JSON 解析器解析字符串为字典
    account = data_dict.get('accountVal')
    password = data_dict.get('passwordVal')
    token = data_dict.get('tokenLocal')
    

    payload = {
    'exp': datetime.now() + timedelta(days=7),  # 令牌过期时间
    'username': account # 想要传递的信息,如用户名ID
    }

    #获取数据库中的数据
    cur = conn.cursor()
    # print(account,password)
    try:
        sql = "SELECT EXISTS (SELECT * FROM user WHERE account = %s)" #%s 是占位符，表示待填入的参数
        cur.execute(sql,account)#执行sql语句
        result = cur.fetchone()[0]
        #result = cur.fetchall()#获取所有结果
        if  result == 0:    
            print("登录失败")   
            response = make_response(jsonify({"code": 10002, "msg": "账号不存在！"}))
        else:
            sql = "SELECT EXISTS (SELECT * FROM user WHERE account = %s AND password = %s)"
            cur.execute(sql,(account,password))#执行sql语句
            result = cur.fetchone()[0] #获取单个结果
            if result == 0:
                response = make_response(jsonify({"code": 10001, "msg": "密码错误！"}))
            else:
                if(token != None):
                    sql = "SELECT EXISTS (SELECT * FROM user WHERE token = %s)"
                    cur.execute(sql,(token))#执行sql语句
                    result = cur.fetchone()[0] #获取单个结果
                    if(result == 1):
                        response = make_response(jsonify({"code": 10009, "msg": "账户已登录！","token":token}))
                else:
                    encoded_jwt = jwt.encode(payload, key, algorithm='HS256') # 生成令牌
                    update_sql = "UPDATE user SET token = %s WHERE account = %s"
                    cur.execute(update_sql, (encoded_jwt, account))
                    conn.commit()
                    response = make_response(jsonify({"code": 10000, "msg": "登录成功！","token":encoded_jwt}))
                    print("登录成功")        
    except Exception as e:
        print("Error:", str(e))
        response = make_response(jsonify({"code": 10002, "msg": False}))

    response.headers['Access-Control-Allow-Origin'] = '*' #允许跨域访问
    cur.close()#关闭游标

    return response

# 注册用户
@app.route('/register', methods=["POST"])
def register():
    # 获取请求中的参数
    data = request.get_data()  # 获取原始的请求数据
    data_str = data.decode("utf-8")  # 将字节字符串解码为普通字符串
    data_dict = json.loads(data_str)  # 使用 JSON 解析器解析字符串为字典

    account = data_dict.get('accountVal')
    password = data_dict.get('passwordVal')

    # 创建游标对象
    cur = conn.cursor()


    payload = {
    'exp': datetime.now() + timedelta(days=7),  # 令牌过期时间
    'username': account # 想要传递的信息,如用户名ID
    }

    try:
        # 检查账户是否已存在
        check_sql = "SELECT EXISTS (SELECT * FROM user WHERE account = %s)"
        cur.execute(check_sql, account)
        account_exists = cur.fetchone()[0]
        print(account_exists)
        if account_exists == 1:
            response = make_response(jsonify({"code": 10005, "msg": "账户已存在！"}))
        else:
            # 插入新用户数据
            encoded_jwt = jwt.encode(payload, key, algorithm='HS256') # 生成令牌
            insert_sql = "INSERT INTO user (account, password, token) VALUES (%s, %s, %s)"
            cur.execute(insert_sql, (account, password, encoded_jwt))
            conn.commit()
            print(encoded_jwt)
            response = make_response(jsonify({"code": 10003, "msg": "注册成功！","token":encoded_jwt}))
    except Exception as e:
        print("Error:", str(e),66666)
        response = make_response(jsonify({"code": 10004, "msg": "注册失败！"}))
    
    response.headers['Access-Control-Allow-Origin'] = '*'
    cur.close()

    return response

@app.route('/auth', methods=["POST"])
def auth():

    token = request.headers.get('Authorization')  # Get the token from the request headers
    try:
        decoded_jwt = jwt.decode(token, key, algorithms=['HS256'])  # Verify the token
        print(decoded_jwt);
        # 对比时间戳，当前时间大于过期时间，说明token已过期
        if datetime.fromtimestamp(decoded_jwt['exp']) < datetime.now():
            raise jwt.ExpiredSignatureError
        response = make_response(jsonify({"code": 10006, "msg": "Token合法"}))
        
    except jwt.ExpiredSignatureError:
        # Token has expired, redirect to the login page
        response = make_response(jsonify({"code": 10007, "msg": "Token已过期"}))
        
    except jwt.DecodeError:
        # Invalid token, redirect to the login page

        response = make_response(jsonify({"code": 10008, "msg": "Token不合法"}))

    response.headers['Access-Control-Allow-Origin'] = '*' # Allow cross-origin access
    return response

if __name__ == '__main__':
    app.run()