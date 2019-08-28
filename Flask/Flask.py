from flask import Flask, jsonify, request
from flask import Response
import mysql.connector
import json
import ast

app = Flask(__name__)
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="parking"
)

@app.route("/")
def hello():
    string = "{'key': 'hello'}"
    string = json.dumps(string)
    resp = Response(string)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Content-Type'] = 'application/json; charset=utf-8'
    return resp

@app.route("/history")
def history():
    query = request.args.get('query')
    if query is None:
        mycursor=mydb.cursor()
        sql="SELECT * FROM history ORDER BY time DESC"
        mycursor.execute(sql, )
        result=mycursor.fetchall()
        result=jsonify(result)
        result.headers['Access-Control-Allow-Origin'] = '*'
        result.headers['Content-Type'] = 'application/json; charset=utf-8'
        return result
    else:
        mycursor = mydb.cursor()
        query = '%' + query + '%'
        query = str(query)
        sql = "SELECT * FROM history WHERE name LIKE %s ORDER BY time DESC"
        adr = (query, )
        mycursor.execute(sql, adr)
        result = mycursor.fetchall()
        print(query)
        result = jsonify(result)
        result.headers['Access-Control-Allow-Origin'] = '*'
        result.headers['Content-Type'] = 'application/json; charset=utf-8'
        return result

@app.route("/profile")
def profile():
    mycursor=mydb.cursor()
    id = request.args.get('id')
    sql = "SELECT * FROM users WHERE id = %s"
    adr = (id, )
    mycursor.execute(sql, adr)
    result=mycursor.fetchall()
    result = jsonify(result)
    result.headers['Access-Control-Allow-Origin'] = '*'
    result.headers['Content-Type'] = 'application/json; charset=utf-8'
    return result

@app.route("/delete")
def delete():
    mycursor=mydb.cursor()
    name = request.args.get('name')
    license = request.args.get('license')
    print(name)
    print(license)
    sql = "DELETE FROM users WHERE name = %s AND license = %s"
    adr = (name, license, )
    mycursor.execute(sql,adr)
    mydb.commit()
    resp = str(mycursor.rowcount) + " record deleted"
    resp = Response(resp)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route("/contoh", methods=['GET','POST'])
def contoh():
    i = 0
    dictlist = []
    templist = []
    keys = ['id', 'name', 'license']

    if request.method == 'POST':
        mycursor = mydb.cursor()
        data = request.form.to_dict()
        data = data.popitem()
        data = data[0]
        data = ast.literal_eval(data)
        sql = ("INSERT INTO users (name, license, email, phone) values (%s, %s, %s, %s)")
        adr = (data['name'], data['license'], data['email'], data['phone'],)
        mycursor.execute(sql, adr)
        mydb.commit
        resp = str(mycursor.rowcount) + " record inserted"
        resp = Response(resp)
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    else:
        query = request.args.get('query')
        if query is None:
            mycursor = mydb.cursor()
            sql = ("SELECT name FROM users ORDER BY id")
            mycursor.execute(sql)
            name = mycursor.fetchall()
            sql = ("SELECT license FROM users ORDER BY id")
            mycursor.execute(sql)
            license = mycursor.fetchall()
            sql = ("SELECT id FROM users ORDER BY id")
            mycursor.execute(sql)
            id = mycursor.fetchall()

            while i < len(name):
                NAME = str(name[i])
                NAME = NAME.replace("(", " ")
                NAME = NAME.replace(")", " ")
                NAME = NAME.replace(",", " ")
                NAME = NAME.replace("'", " ")
                NAME = NAME.strip()

                LICENSE = str(license[i])
                LICENSE = LICENSE.replace("(", " ")
                LICENSE = LICENSE.replace(")", " ")
                LICENSE = LICENSE.replace(",", " ")
                LICENSE = LICENSE.replace("'", " ")
                LICENSE = LICENSE.strip()

                ID = str(id[i])
                ID = ID.replace("(", " ")
                ID = ID.replace(")", " ")
                ID = ID.replace(",", " ")
                ID = ID.strip()

                templist.append(ID)
                templist.append(NAME)
                templist.append(LICENSE)
                dictlist.append(dict(zip(keys, templist)))
                templist.clear()
                i = i + 1
            dictlist = json.dumps(dictlist)
            resp = Response(dictlist)
            resp.headers['Access-Control-Allow-Origin'] = '*'
            resp.headers['Content-Type'] = 'application/json; charset=utf-8'
            return resp

        else:
            mycursor = mydb.cursor()
            query = '%' + query + '%'
            sql = ("SELECT id FROM users WHERE name LIKE %s")
            adr = (query, )
            mycursor.execute(sql,adr)
            id = mycursor.fetchall()
            sql = ("SELECT name FROM users WHERE name LIKE %s")
            adr = (query, )
            mycursor.execute(sql,adr)
            name = mycursor.fetchall()
            sql = ("SELECT license FROM users WHERE name LIKE %s")
            adr = (query, )
            mycursor.execute(sql,adr)
            license = mycursor.fetchall()

            while i < len(name):
                NAME = str(name[i])
                NAME = NAME.replace("(", " ")
                NAME = NAME.replace(")", " ")
                NAME = NAME.replace(",", " ")
                NAME = NAME.replace("'", " ")
                NAME = NAME.strip()

                LICENSE = str(license[i])
                LICENSE = LICENSE.replace("(", " ")
                LICENSE = LICENSE.replace(")", " ")
                LICENSE = LICENSE.replace(",", " ")
                LICENSE = LICENSE.replace("'", " ")
                LICENSE = LICENSE.strip()

                ID = str(id[i])
                ID = ID.replace("(", " ")
                ID = ID.replace(")", " ")
                ID = ID.replace(",", " ")
                ID = ID.strip()

                templist.append(ID)
                templist.append(NAME)
                templist.append(LICENSE)
                dictlist.append(dict(zip(keys, templist)))
                templist.clear()
                i = i + 1
            dictlist = json.dumps(dictlist)
            resp = Response(dictlist)
            resp.headers['Access-Control-Allow-Origin'] = '*'
            resp.headers['Content-Type'] = 'application/json; charset=utf-8'
            return resp

if (__name__) == '__main__':
    app.run(debug=True)