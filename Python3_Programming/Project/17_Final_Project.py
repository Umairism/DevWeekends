# ==========================================
# 17. Final Project
# ==========================================
import json
import os

class GradeManager:
    def __init__(self, filename="grades.json"):
        self.filename = filename
        self.students = {}
        self.load_data()
        
    def load_data(self):
        if os.path.exists(self.filename):
            try:
                with open(self.filename, 'r') as file:
                    self.students = json.load(file)
            except json.JSONDecodeError:
                print("Error reading the database. Starting fresh.")
                self.students = {}
                
    def save_data(self):
        with open(self.filename, 'w') as file:
            json.dump(self.students, file, indent=4)
            
    def add_student(self, name):
        if name in self.students:
            print(f"Student '{name}' already exists!")
        else:
            self.students[name] = []
            print(f"Student '{name}' added successfully.")
            self.save_data()
            
    def record_score(self, name, score):
        if name not in self.students:
            print(f"Student '{name}' not found.")
            return
            
        if not (0 <= score <= 100):
            print("Score must be between 0 and 100.")
            return
            
        self.students[name].append(score)
        print(f"Recorded score {score} for '{name}'.")
        self.save_data()
        
    def calculate_average(self, name):
        if name not in self.students:
            print(f"Student '{name}' not found.")
            return
            
        scores = self.students[name]
        if not scores:
            print(f"'{name}' has no scores yet.")
            return
            
        average = sum(scores) / len(scores)
        print(f"'{name}'s average score is: {average:.2f}")

def main():
    manager = GradeManager()
    
    print("Welcome to the CLI Student Grade Manager!")
    while True:
        print("\nMenu:")
        print("1. Add Student")
        print("2. Record Score")
        print("3. Calculate Average")
        print("4. Exit")
        
        choice = input("Enter your choice (1-4): ")
        
        if choice == '1':
            name = input("Enter student's name: ").strip()
            if name:
                manager.add_student(name)
        elif choice == '2':
            name = input("Enter student's name: ").strip()
            try:
                score = float(input("Enter score (0-100): "))
                manager.record_score(name, score)
            except ValueError:
                print("Invalid score. Please enter a number.")
        elif choice == '3':
            name = input("Enter student's name: ").strip()
            if name:
                manager.calculate_average(name)
        elif choice == '4':
            print("Goodbye!")
            break
        else:
            print("Invalid choice, please try again.")

if __name__ == "__main__":
    print("--- Automated Grade Manager Demo ---")
    demo_manager = GradeManager("demo_grades.json")
    
    print("\n[Adding a student]")
    demo_manager.add_student("Umair")
    
    print("\n[Recording scores]")
    demo_manager.record_score("Umair", 85)
    demo_manager.record_score("Umair", 92)
    
    print("\n[Calculating Average]")
    demo_manager.calculate_average("Umair")
    
    # Check your folder! You will see 'demo_grades.json' has been created.
    # We are leaving it here so you can verify the file handling worked.
