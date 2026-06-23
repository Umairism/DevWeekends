from utils import get_completion

def demonstrate_formatting():
    print("--- Output Formatting & Generation ---")
    
    print("\n1. Translation and Language Detection")
    text_es = "Hola, ¿dónde está la biblioteca?"
    prompt_detect = f"What language is the following text written in? Text: {text_es}"
    print(f"Language Detection: {get_completion(prompt_detect)}")
    
    prompt_translate = f"Translate the following text to French and English: {text_es}"
    print(f"Translation:\n{get_completion(prompt_translate)}\n")
    
    print("2. Tone Conversion and Proofreading")
    slang_text = "Yo, this app is straight fire but it keeps crashing on my phone."
    prompt_formal = f"Convert the following informal text into a formal, professional bug report: {slang_text}"
    print(f"Formal tone:\n{get_completion(prompt_formal)}\n")
    
    print("3. Python Dictionary to HTML Table")
    data_dict = "{'Product': 'Laptop', 'Price': '$999', 'Stock': 'In Stock'}"
    prompt_html = f"""
    Convert the following Python dictionary into a simple HTML table.
    Return ONLY the HTML code without any markdown formatting.
    Dictionary: {data_dict}
    """
    print(f"HTML Output:\n{get_completion(prompt_html)}\n")

if __name__ == "__main__":
    demonstrate_formatting()
