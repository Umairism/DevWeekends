# ==========================================
# 11. JSON Handling
# ==========================================
import json

def json_demo():
    print("--- JSON Parsing and Converting ---")
    
    json_string = '{"name": "Alice", "age": 25, "is_student": true}'
    
    parsed_dict = json.loads(json_string)
    print(f"Parsed Dictionary: {parsed_dict}")
    print(f"Accessing data: Alice is {parsed_dict['age']} years old.")
    
    python_dict = {
        "title": "Python Developer",
        "skills": ["Python", "Django", "SQL"],
        "experience_years": 3
    }
    
    new_json_string = json.dumps(python_dict, indent=4)
    print("\nConverted JSON String:")
    print(new_json_string)

def mini_project_student_records():
    print("\n--- Mini Project: Student Records (Highest Score) ---")
    
    students_json = '''
    [
        {"name": "John", "score": 85},
        {"name": "Emma", "score": 92},
        {"name": "Luke", "score": 78}
    ]
    '''
    
    students = json.loads(students_json)
    
    highest_score = 0
    top_student = ""
    
    for student in students:
        if student["score"] > highest_score:
            highest_score = student["score"]
            top_student = student["name"]
            
    print(f"The top student is {top_student} with a score of {highest_score}!")

if __name__ == "__main__":
    json_demo()
    mini_project_student_records()
