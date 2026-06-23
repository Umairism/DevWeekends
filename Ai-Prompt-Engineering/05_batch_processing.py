from utils import get_completion

def process_batch():
    print("--- Loops & Batch Processing ---")
    
    reviews = [
        "The battery life is amazing, it lasts for days without needing a charge.",
        "Terrible experience. The screen cracked after just one day of normal use.",
        "It's an okay phone. Nothing special, but it gets the job done for the price."
    ]
    
    print("\nBatch Summarization:")
    for i, review in enumerate(reviews):
        prompt = f"Summarize the following review in exactly 5 words: {review}"
        response = get_completion(prompt)
        print(f"Review {i+1}: {response}")
        
    print("\nNews Alert System (Keyword Detection):")
    news_headlines = [
        "Local sports team wins the championship game",
        "New breakthrough in artificial intelligence announced today",
        "Stock market sees a sudden drop amid global concerns"
    ]
    
    keywords = ["artificial intelligence", "AI", "technology", "breakthrough"]
    
    for i, headline in enumerate(news_headlines):
        prompt = f"""
        Determine if the following headline is about technology or AI.
        Headline: {headline}
        Keywords to look for: {', '.join(keywords)}
        Output only 'ALERT' if it matches, or 'IGNORE' if it does not.
        """
        response = get_completion(prompt)
        print(f"Headline {i+1}: {response} - {headline}")

if __name__ == "__main__":
    process_batch()
