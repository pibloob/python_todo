from flask import Flask, render_template, redirect
from flask import request
from flask_sqlalchemy import SQLAlchemy
import secrets

# MONOTASK

app = Flask(__name__) # initialiseren flask app

# configuratie  van de database, verbinding maken met server
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# model van todo-items
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)        #  primaire sleutel
    title = db.Column(db.String(100), nullable=False)   #  titel van de taak, kolom niet leeg
    complete = db.Column(db.Boolean, default=False)     #  taak voltooid 
    tag = db.Column(db.String(50), default="daily")        #  label voor categorisering

# secret key
foo = secrets.token_urlsafe(16)
app.secret_key = foo

# route browser naar homepage
@app.route('/')
def home():
    return render_template('index.html')

# Post-requests
@app.route('/add-todo', methods=['POST'])
def add_todo():
    title = request.form.get('title')
    tag = request.form.get('tag')
    new_todo = Todo(title=title, tag=tag, complete=False)
    db.session.add(new_todo)
    db.session.commit()
    return redirect('/')  # Dit stuurt de gebruiker terug naar de homepagina na het toevoegen.

if __name__ == '__main__':
    with app.app_context(): # binnen juiste context (tijdelijke werktruimte)
        db.create_all() # aanmaken sqllite database
    app.run(debug=True)
