from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import secrets

app = Flask(__name__)  # Initialize Flask app

# Database configuration: connecting to SQLite database named 'todo.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)  # Initialize SQLAlchemy with Flask app

# Todo model definition
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Primary key
    title = db.Column(db.String(100), nullable=False)  # Task title, cannot be empty
    complete = db.Column(db.Boolean, default=False)  # Task completion status
    tag = db.Column(db.String(50), default="general")  # Tag for categorization, default "general"

# Route to render the homepage
@app.route('/')
def index():
    todos = Todo.query.all()  # Retrieve all todo items from the database
    return render_template('index.html', todos=todos)

# Route to add a new todo
@app.route('/add-todo', methods=['POST'])
def add_todo():
    title = request.form['title']  # Get title from form data
    tag = request.form.get('tag', 'general')  # Get tag from form data, default to 'general' if not provided
    new_todo = Todo(title=title, tag=tag)  # Create new Todo item
    db.session.add(new_todo)  # Add new Todo item to database session
    db.session.commit()  # Commit session to save changes to database
    return redirect(url_for('index'))  # Redirect back to the homepage

# Route to toggle completion status of a todo
@app.route('/toggle-complete/<int:todo_id>')
def toggle_complete(todo_id):
    todo = Todo.query.get_or_404(todo_id)  # Retrieve todo by id or return 404 error if not found
    todo.complete = not todo.complete  # Toggle completion status
    db.session.commit()  # Commit session to save changes
    return redirect(url_for('index'))  # Redirect back to the homepage

# Route to delete a todo
@app.route('/delete-todo/<int:todo_id>')
def delete_todo(todo_id):
    todo = Todo.query.get_or_404(todo_id)  # Retrieve todo by id or return 404 error if not found
    db.session.delete(todo)  # Delete todo from database
    db.session.commit()  # Commit session to save changes
    return redirect(url_for('index'))  # Redirect back to the homepage

# Secret key generation for session management
app.secret_key = secrets.token_urlsafe(16)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create all tables according to model definitions
    app.run(debug=True)  # Run Flask app in debug mode
