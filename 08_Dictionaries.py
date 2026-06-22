# ==========================================
# 8. Dictionaries
# ==========================================

def dictionaries_demo():
    user_profile = {
        "name": "Umair",
        "age": 28,
        "role": "Developer"
    }

    print("--- Dictionary Access ---")
    print(f"User Name: {user_profile['name']}")
    print(f"Location: {user_profile.get('location', 'Not specified')}")

    user_profile["location"] = "Earth"
    user_profile["age"] = 29
    print("\nAfter adding/updating:", user_profile)

    del user_profile["role"]
    print("After deleting 'role':", user_profile)

    print("\n--- Iterating ---")
    for key in user_profile.keys():
        print(f"Key: {key}")
        
    for value in user_profile.values():
        print(f"Value: {value}")
        
    for key, value in user_profile.items():
        print(f"{key.capitalize()}: {value}")

def mini_project_phone_book():
    print("\n--- Mini Project: Phone Book System ---")
    phone_book = {
        "Alice": "555-0101",
        "Bob": "555-0202",
        "Charlie": "555-0303"
    }

    def lookup_number(name):
        number = phone_book.get(name)
        if number:
            print(f"Found {name}'s number: {number}")
        else:
            print(f"Sorry, {name} is not in the phone book.")

    lookup_number("Bob")
    lookup_number("David")
    
    print("\nAdding David to the phone book...")
    phone_book["David"] = "555-0404"
    lookup_number("David")

if __name__ == "__main__":
    dictionaries_demo()
    mini_project_phone_book()
