from utils import get_completion

def demonstrate_clarity():
    print("--- Demonstrating Principle 1: Clarity & Structure ---")
    
    text = "The solar system has eight planets. Jupiter is the largest."
    
    # Use delimiters and specify format
    prompt = f"""
    Summarize the text provided in triple backticks into a single sentence.
    Output the result in a JSON format with a key 'summary'.
    
    ```{text}```
    """
    response = get_completion(prompt)
    print("Clarity and Structure Output:")
    print(response)

def demonstrate_reasoning():
    print("\n--- Demonstrating Principle 2: Reasoning & Thinking Time ---")
    
    # Ask the model to reason step-by-step
    prompt = """
    A student answered a math problem:
    Problem: I have 5 apples. I give 2 to my friend and buy 4 more. How many do I have?
    Student's Answer: 9 apples.
    
    Determine if the student's answer is correct or incorrect. 
    First, work out your own solution to the problem step-by-step.
    Then, compare your solution to the student's solution.
    Finally, conclude if the student was correct.
    """
    response = get_completion(prompt)
    print("Reasoning Output:")
    print(response)

if __name__ == "__main__":
    demonstrate_clarity()
    demonstrate_reasoning()
