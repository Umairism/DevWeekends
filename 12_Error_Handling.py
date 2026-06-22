# ==========================================
# 12. Error Handling
# ==========================================

class NegativeNumberError(Exception):
    pass

def error_handling_demo():
    print("--- Try / Except blocks ---")
    
    try:
        result = 10 / 0
        print(result)
    except ZeroDivisionError:
        print("Error: You cannot divide a number by zero!")
    except TypeError:
        print("Error: Invalid types for division!")
    finally:
        print("Finally block executes no matter what happens.")
        
    print("\n--- Raising Custom Exceptions ---")
    number = -5
    
    try:
        if number < 0:
            raise NegativeNumberError("Negative numbers are not allowed here!")
    except NegativeNumberError as e:
        print(f"Custom Error Caught: {e}")

if __name__ == "__main__":
    error_handling_demo()
