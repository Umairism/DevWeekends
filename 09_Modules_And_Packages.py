# ==========================================
# 9. Modules & Packages
# ==========================================

import math

def modules_demo():
    print("--- Built-in 'math' Module ---")
    number = 16
    decimal_number = 4.3
    
    print(f"Square root of {number} is {math.sqrt(number)}")
    print(f"Ceil of {decimal_number} is {math.ceil(decimal_number)}")
    print(f"Floor of {decimal_number} is {math.floor(decimal_number)}")
    
    print("\n--- External Packages ---")
    print("To install an external package, use: pip install requests")
    print("Example usage:")
    print("import requests")
    print("response = requests.get('https://api.github.com')")
    print("print(response.status_code)")

if __name__ == "__main__":
    modules_demo()
