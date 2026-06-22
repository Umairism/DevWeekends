# ==========================================
# 6. Control Flow
# ==========================================

def control_flow_demo():
    print("--- if / elif / else (Number Categorization) ---")
    number = 15
    
    if number > 0:
        print(f"{number} is a positive number.")
    elif number < 0:
        print(f"{number} is a negative number.")
    else:
        print(f"{number} is zero.")

    print("\n--- for loop with range() ---")
    for i in range(1, 4):
        print(f"Counting: {i}")

    print("\n--- while loop with break and continue ---")
    count = 0
    while True:
        count += 1
        
        if count == 3:
            print("Skipping number 3 (using 'continue')")
            continue
            
        if count > 5:
            print("Breaking the loop at 6 (using 'break')")
            break
            
        print(f"While Loop Count: {count}")

def mini_project_fizzbuzz():
    print("\n--- Mini Project: FizzBuzz ---")
    
    for num in range(1, 16):
        if num % 3 == 0 and num % 5 == 0:
            print("FizzBuzz")
        elif num % 3 == 0:
            print("Fizz")
        elif num % 5 == 0:
            print("Buzz")
        else:
            print(num)

if __name__ == "__main__":
    control_flow_demo()
    mini_project_fizzbuzz()
