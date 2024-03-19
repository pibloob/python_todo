from flask import Flask, render_template
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
    tag = db.Column(db.String(50), default=None)        #  label voor categorisering

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
    # haalt data uit het request en voegt een nieuwe todo toe aan de database.
    new_todo = Todo(title=request.form.get('Title'))
    db.session.add(new_todo)
    db.session.commit()

if __name__ == '__main__':
    
    with app.app_context(): # binnen juiste context (tijdelijke werktruimte)
        db.create_all() # aanmaken sqllite database
    app.run(debug=True)
