from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

tasks = []

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    tasks.append(data["task"])
    return jsonify({"message": "Task added"})

@app.route("/tasks/<int:index>", methods=["DELETE"])
def delete_task(index):
    tasks.pop(index)
    return jsonify({"message": "Task deleted"})

@app.route("/tasks/<int:index>", methods=["PUT"])
def edit_task(index):
    data = request.json
    tasks[index] = data["task"]
    return jsonify({"message": "Task updated"})

if __name__ == "__main__":
    app.run(debug=True)