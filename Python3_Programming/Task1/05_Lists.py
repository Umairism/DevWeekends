# ==========================================
# 5. Lists
# ==========================================

def lists_demo():
    fruits = ["Apple", "Banana", "Mango", "Orange"]
    print("Initial list of fruits:", fruits)

    print(f"First fruit: {fruits[0]}")
    print(f"Last fruit (negative index): {fruits[-1]}")

    fruits.append("Grapes")
    print("\nAfter append:", fruits)

    fruits.insert(1, "Kiwi")
    print("After insert:", fruits)

    fruits.remove("Banana")
    print("After remove:", fruits)

    popped_fruit = fruits.pop()
    print(f"After pop (removed '{popped_fruit}'):", fruits)

    fruits.sort()
    print("\nSorted list:", fruits)
    
    fruits.reverse()
    print("Reversed list:", fruits)
    
    print(f"Total number of fruits: {len(fruits)}")

    print("\nFirst two fruits (Slicing):", fruits[0:2])

    print("\nIterating through the list:")
    for index, fruit in enumerate(fruits):
        print(f"  {index + 1}. {fruit}")

def mini_project_filter_even():
    print("\n--- Mini Project: Filter Even Numbers ---")
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    
    even_numbers = []
    for num in numbers:
        if num % 2 == 0:
            even_numbers.append(num)
            
    print(f"Original numbers: {numbers}")
    print(f"Even numbers only : {even_numbers}")

if __name__ == "__main__":
    lists_demo()
    mini_project_filter_even()
