# ==========================================
# 10. File Handling
# ==========================================
import os

def file_handling_demo():
    print("--- File Handling ---")
    filename = "sample_data.txt"
    
    fruits = ["Apple", "Banana", "Cherry"]
    
    print(f"Writing data to {filename}...")
    with open(filename, 'w') as file:
        for fruit in fruits:
            file.write(fruit + "\n")
            
    print(f"\nReading data from {filename}:")
    with open(filename, 'r') as file:
        lines = file.readlines()
        for i, line in enumerate(lines):
            print(f"Line {i + 1}: {line.strip()}")
            
    if os.path.exists(filename):
        os.remove(filename)
        print(f"\nCleaned up: Deleted {filename}")

if __name__ == "__main__":
    file_handling_demo()
