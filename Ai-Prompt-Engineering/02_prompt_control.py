from utils import get_completion

def demonstrate_prompt_control():
    print("--- Demonstrating Prompt Control Techniques ---")
    
    base_concept = "Quantum computing is a rapidly-emerging technology that harnesses the laws of quantum mechanics to solve problems too complex for classical computers."
    
    # 1. Word limits and tone
    prompt_short = f"""
    Explain the following text in exactly 15 words.
    Text: {base_concept}
    """
    response_short = get_completion(prompt_short)
    print("Word limit (15 words):")
    print(response_short)
    
    # 2. Audience constraints
    prompt_child = f"""
    Explain the following text so that a 10-year-old can understand it.
    Use a casual tone.
    Text: {base_concept}
    """
    response_child = get_completion(prompt_child)
    print("\nAudience constraint (10-year-old):")
    print(response_child)
    
    # 3. Transparency constraints
    prompt_signature = f"""
    Explain the following text professionally.
    End your response with a signature block formatted exactly as:
    --
    Written by automated system
    """
    response_signature = get_completion(prompt_signature)
    print("\nTransparency constraint (Signature):")
    print(response_signature)

if __name__ == "__main__":
    demonstrate_prompt_control()
