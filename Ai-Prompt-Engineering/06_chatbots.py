from utils import get_completion_from_messages

def simulate_conversation():
    print("--- Conversation Design & Chatbots ---")
    
    # Establish the system persona
    messages = [
        {"role": "system", "content": "You are a friendly customer service bot for a pizza restaurant. You are helpful and keep your answers brief."}
    ]
    
    # Turn 1
    user_input_1 = "Hi, I'd like to order a pizza."
    print(f"User: {user_input_1}")
    messages.append({"role": "user", "content": user_input_1})
    
    response_1 = get_completion_from_messages(messages)
    print(f"Bot: {response_1}\n")
    messages.append({"role": "assistant", "content": response_1})
    
    # Turn 2
    user_input_2 = "I'll take a large pepperoni pizza, please."
    print(f"User: {user_input_2}")
    messages.append({"role": "user", "content": user_input_2})
    
    response_2 = get_completion_from_messages(messages)
    print(f"Bot: {response_2}\n")
    messages.append({"role": "assistant", "content": response_2})
    
    # Generate JSON summary of the order
    summary_prompt = "Based on the conversation so far, generate a JSON object representing the user's order. It should have keys for 'item', 'size', and 'status'."
    messages.append({"role": "user", "content": summary_prompt})
    
    # Notice we ask for the JSON object directly and use a lower temperature
    final_summary = get_completion_from_messages(messages, temperature=0.0)
    print("Order Summary Output:")
    print(final_summary)

if __name__ == "__main__":
    simulate_conversation()
