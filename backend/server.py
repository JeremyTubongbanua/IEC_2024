from flask import Flask, jsonify, request
from datetime import datetime, timedelta
from models import User, Task, EmployeeWorkingHour, Assignment
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = [
    User(1, "Alice", "Manager"), 
    User(2, "Bob", "Employee"), 
    User(3, "Charlie", "Employee")
]

tasks = [
    Task(1, "Task 1", "Description for Task 1", "2024-11-05", 3, "2024-11-03T09:00:00"),  # Updated Task 1
    Task(2, "Task 2", "Description for Task 2", "2024-11-06", 3, "2024-11-04")
]


working_hours = [
    EmployeeWorkingHour(1, 1, "09:00", "17:00"),
    EmployeeWorkingHour(2, 2, "09:00", "17:00"),
    EmployeeWorkingHour(3, 3, "10:00", "18:00")
]

assignments = [
    Assignment(1, 1, 2, "2024-11-03T09:00:00", "2024-11-03T14:00:00"),
    Assignment(2, 2, 3, "2024-11-04T10:00:00", "2024-11-04T13:00:00")
]

@app.route('/users/list', methods=['GET'])
def get_all_users():
    user_list = [{"id": user.id, "name": user.name} for user in users]
    return jsonify({"users": user_list}), 200

def print_all_tables():
    print("Users Table:")
    for user in users:
        print(vars(user))
    print("\nTasks Table:")
    for task in tasks:
        print(vars(task))
    print("\nEmployee Working Hours Table:")
    for wh in working_hours:
        print(vars(wh))
    print("\nAssignments Table:")
    for assignment in assignments:
        print(vars(assignment))
    print("\n" + "="*40 + "\n")


def assign_task_to_employee(task):
    for wh in working_hours:
        user_id = wh.user_id
        start_time = datetime.strptime(wh.start_time, "%H:%M")
        end_time = datetime.strptime(wh.end_time, "%H:%M")

        print(f"User ID: {user_id}, Working Hours: {wh.start_time} to {wh.end_time}")

        # Remove 'T' from task start datetime string
        task_start_datetime_str = task.start.replace("T", " ")
        assignment_start = datetime.strptime(task_start_datetime_str, "%Y-%m-%d %H:%M:%S")
        assignment_end = assignment_start + timedelta(hours=task.hours)

        print(f"Task Start: {task.start}, Assignment Start: {assignment_start.isoformat()}, Assignment End: {assignment_end.isoformat()}")

        if all(
            a.user_id != user_id or
            datetime.fromisoformat(a.end_timestamp) <= assignment_start or
            datetime.fromisoformat(a.start_timestamp) >= assignment_end
            for a in assignments
        ):
            new_assignment = Assignment(
                len(assignments) + 1,
                task.id,
                user_id,
                assignment_start.isoformat(),
                assignment_end.isoformat()
            )
            assignments.append(new_assignment)
            print(f"Assigned {task.task_name} to User {user_id}")
            print_all_tables()
            return



@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    task = Task(len(tasks) + 1, data['task_name'], data['description'], data['deadline'], data['hours'], data['start'])
    tasks.append(task)
    
    assign_task_to_employee(task)

    print_all_tables()
    return jsonify({"message": "Task created", "task": vars(task)}), 201

@app.route('/employees/<int:user_id>/tasks', methods=['GET'])
def get_employee_tasks(user_id):
    user_tasks = [vars(task) for assignment in assignments if assignment.user_id == user_id for task in tasks if task.id == assignment.task_id]
    print_all_tables()
    return jsonify({"user_id": user_id, "tasks": user_tasks}), 200

@app.route('/employees/tasks/<name>', methods=['GET'])
def get_employee_tasks_by_name(name):
    user = next((u for u in users if u.name == name), None)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    user_tasks = [
        vars(task) 
        for assignment in assignments if assignment.user_id == user.id 
        for task in tasks if task.id == assignment.task_id
    ]
    print_all_tables()
    return jsonify({"user_name": user.name, "tasks": user_tasks}), 200

@app.route('/employees/hours/<name>', methods=['GET'])
def get_employee_working_hours_by_name(name):
    user = next((u for u in users if u.name == name), None)
    if not user:
        return jsonify({"error": "User not found"}), 404

    work_hours = next(({"start_time": wh.start_time, "end_time": wh.end_time} 
                       for wh in working_hours if wh.user_id == user.id), None)
    
    if not work_hours:
        return jsonify({"error": "Working hours not found for user"}), 404

    print_all_tables()
    return jsonify({"user_name": user.name, "working_hours": work_hours}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)

