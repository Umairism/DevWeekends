# ==========================================
# 16. Advanced Python
# ==========================================

def list_comprehension_demo():
    print("--- List Comprehensions ---")
    numbers = [1, 2, 3, 4, 5, 6]
    
    doubled_standard = []
    for n in numbers:
        doubled_standard.append(n * 2)
        
    doubled_comp = [n * 2 for n in numbers]
    print(f"Doubled: {doubled_comp}")
    
    evens_only = [n for n in numbers if n % 2 == 0]
    print(f"Evens only: {evens_only}")
    
    matrix = [[1, 2], [3, 4], [5, 6]]
    flattened = [item for row in matrix for item in row]
    print(f"Flattened matrix: {flattened}")

def dunder_main_demo():
    print("\n--- Understand if __name__ == '__main__': ---")
    print("When Python runs a file directly, it sets __name__ to '__main__'.")
    print("If the file is imported, __name__ is set to the file's name.")
    print(f"Right now, in this file, __name__ is: '{__name__}'")

if __name__ == "__main__":
    list_comprehension_demo()
    dunder_main_demo()
