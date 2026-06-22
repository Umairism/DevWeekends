# ==========================================
# 7. Functions
# ==========================================

def add_numbers(a, b):
    return a + b

def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

global_multiplier = 10 

def multiply_by_global(number):
    local_result = number * global_multiplier
    return local_result

def mini_project_factorial(n):
    if n < 0:
        return "Factorial does not exist for negative numbers."
    elif n == 0:
        return 1
    
    result = 1
    for i in range(1, n + 1):
        result *= i
        
    return result

def main():
    print("--- Function Returns ---")
    sum_result = add_numbers(5, 7)
    print(f"5 + 7 = {sum_result}")

    print("\n--- Default & Keyword Arguments ---")
    greet("Alice")
    greet("Bob", "Good morning")
    greet(greeting="Howdy", name="Charlie")

    print("\n--- Scope ---")
    print(f"5 * global_multiplier (10) = {multiply_by_global(5)}")

    print("\n--- Mini Project: Factorial ---")
    num_to_test = 5
    print(f"The factorial of {num_to_test} is {mini_project_factorial(num_to_test)}")

if __name__ == "__main__":
    main()
