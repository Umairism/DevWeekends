from utils import get_completion

def demonstrate_extraction_and_classification():
    review = """
    I bought the SolarMax backpack last week. It's incredibly durable and the solar panel 
    charged my phone in just a few hours. However, it's quite heavy even when empty, 
    and the straps dig into my shoulders. Overall, it's a good concept but needs better design.
    """
    
    print("--- 1. Summarize vs Extract ---")
    prompt_summarize = f"Summarize the following review in one sentence:\n{review}"
    print("Summarize:\n" + get_completion(prompt_summarize) + "\n")
    
    prompt_extract = f"Extract the product name and the main complaint from this review:\n{review}"
    print("Extract:\n" + get_completion(prompt_extract) + "\n")
    
    print("--- 2. Sentiment Classification ---")
    prompt_sentiment = f"Classify the sentiment of the following review as exactly 'Positive', 'Negative', or 'Mixed'. Review:\n{review}"
    print("Sentiment:\n" + get_completion(prompt_sentiment) + "\n")
    
    print("--- 3. Emotion Extraction ---")
    prompt_emotion = f"Identify a list of emotions expressed by the writer of this review. Format as a comma-separated list:\n{review}"
    print("Emotions:\n" + get_completion(prompt_emotion) + "\n")
    
    print("--- 4. Zero-shot Topic Detection ---")
    topics = ["Technology", "Outdoors", "Fashion", "Gaming", "Health"]
    prompt_topic = f"""
    Determine whether each item in the following list of topics is covered in the review below.
    List of topics: {', '.join(topics)}
    Review: {review}
    
    Output a JSON dictionary where the keys are the topics and values are boolean (true or false).
    """
    print("Topics:\n" + get_completion(prompt_topic) + "\n")

if __name__ == "__main__":
    demonstrate_extraction_and_classification()
