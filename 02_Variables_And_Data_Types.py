# ==========================================
# 2. Variables & Data Types
# ==========================================

def variables_demo():
    age = 28
    height_meters = 1.75
    name = "Umair"
    is_developer = True

    print(f"Value: {age}, Type: {type(age)}")
    print(f"Value: {height_meters}, Type: {type(height_meters)}")
    print(f"Value: {name}, Type: {type(name)}")
    print(f"Value: {is_developer}, Type: {type(is_developer)}")

    dynamic_var = 100
    print(f"\n[Dynamic Typing Example]")
    print(f"dynamic_var is initially an int: {type(dynamic_var)}")
    
    dynamic_var = "Now I am a string!"
    print(f"dynamic_var is now a string: {type(dynamic_var)}")

if __name__ == "__main__":
    variables_demo()
