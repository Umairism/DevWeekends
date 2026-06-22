# ==========================================
# 4. Strings
# ==========================================

def strings_demo():
    text = "  python programming is fun!  "

    print(f"First character: '{text[0]}'")
    print(f"First non-space character: '{text.strip()[0]}'")
    print(f"Last character: '{text[-1]}'")

    clean_text = text.strip()
    print(f"Sliced substring (first 6 chars): {clean_text[0:6]}")

    print(f"\nOriginal string: '{text}'")
    print(f".upper()   -> '{text.upper()}'")
    print(f".lower()   -> '{text.lower()}'")
    print(f".strip()   -> '{clean_text}'")
    print(f".replace() -> '{clean_text.replace('python', 'Java')}'")
    print(f".split()   -> {clean_text.split(' ')}")

    language = "Python"
    version = 3.12
    print("\n--- String Formatting ---")
    print(f"f-string: I am learning {language} version {version}")
    print(".format(): I am learning {} version {}".format(language, version))

def mini_project_capitalize():
    print("\n--- Mini Project: Capitalize Each Word ---")
    sentence = "hello world from python! learning is awesome."
    
    words = sentence.split(" ")
    capitalized_words = []
    for word in words:
        capitalized_words.append(word.capitalize())
        
    result = " ".join(capitalized_words)
    
    print(f"Original sentence   : {sentence}")
    print(f"Capitalized sentence: {result}")

if __name__ == "__main__":
    strings_demo()
    mini_project_capitalize()
