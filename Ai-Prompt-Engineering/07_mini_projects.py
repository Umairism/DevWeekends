from utils import get_completion, get_completion_from_messages

def run_mini_projects():
    print("--- Mini Projects ---")
    
    print("\n1. Review Summarizer Tool")
    review = """
    I've been using the new X200 wireless headphones for a month. The sound quality is fantastic, 
    with really deep bass and clear highs. However, the battery life is much shorter than advertised. 
    I get about 4 hours instead of the promised 8. Also, they are quite uncomfortable after wearing 
    them for more than an hour. I would only recommend them if you prioritize sound above all else.
    """
    
    summarizer_prompt = f"""
    You are a product review assistant. Your job is to process customer reviews and extract key information.
    
    Review text: {review}
    
    Please provide the following:
    1. A short summary (max 2 sentences)
    2. Sentiment (Positive, Negative, or Neutral)
    3. Pros (list)
    4. Cons (list)
    
    Format the output as a clean, readable text block.
    """
    print("Review Summarizer Output:")
    print(get_completion(summarizer_prompt))
    
    print("\n2. Multi-Language Translation Tool")
    message = "Welcome to our hotel. Breakfast is served from 7 AM to 10 AM in the main dining hall."
    
    translation_prompt = f"""
    Translate the following text into French, Spanish, and Japanese.
    Text: {message}
    
    Output the translations in a clear list format.
    """
    print("Translation Tool Output:")
    print(get_completion(translation_prompt))
    
    print("\n3. Support Chatbot Loop")
    messages = [
        {"role": "system", "content": "You are a helpful IT support assistant. Provide brief, actionable troubleshooting steps."}
    ]
    
    # Simulate a brief user interaction
    user_issue = "My computer screen went black and won't turn back on."
    messages.append({"role": "user", "content": user_issue})
    
    response = get_completion_from_messages(messages)
    print(f"User: {user_issue}")
    print(f"Support Bot:\n{response}")

if __name__ == "__main__":
    run_mini_projects()
