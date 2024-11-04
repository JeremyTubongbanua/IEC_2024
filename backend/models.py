from datetime import datetime

class User:
    def __init__(self, id, name, role):
        self.id = id
        self.created_at = datetime.utcnow()
        self.name = name
        self.role = role


class Task:
    def __init__(self, id, task_name, description, deadline, hours, start):
        self.id = id
        self.created_at = datetime.utcnow()
        self.task_name = task_name
        self.description = description
        self.deadline = deadline
        self.hours = hours
        self.start = start


class EmployeeWorkingHour:
    def __init__(self, id, user_id, start_time, end_time):
        self.id = id
        self.created_at = datetime.utcnow()
        self.user_id = user_id
        self.start_time = start_time
        self.end_time = end_time


class Assignment:
    def __init__(self, id, task_id, user_id, start_timestamp, end_timestamp):
        self.id = id
        self.created_at = datetime.utcnow()
        self.task_id = task_id
        self.user_id = user_id
        self.start_timestamp = start_timestamp
        self.end_timestamp = end_timestamp
