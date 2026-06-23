import os
from dotenv import load_dotenv
from openai import OpenAI

def get_client():
    """Initializes and returns the OpenAI client."""
    load_dotenv()
    
    # The .env file uses 'Api-key', but standard is 'OPENAI_API_KEY'
    # We will pass it explicitly to the client.
    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        raise ValueError("API key not found. Please check your .env file.")
        
    return OpenAI(api_key=api_key)

def get_completion(prompt, model="gpt-4o-mini", temperature=0.0):
    """A simple wrapper to call the OpenAI API with a text prompt."""
    client = get_client()
    messages = [{"role": "user", "content": prompt}]
    
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature
    )
    return response.choices[0].message.content

def get_completion_from_messages(messages, model="gpt-4o-mini", temperature=0.0, response_format=None):
    """Wrapper for multi-turn conversations and system messages."""
    client = get_client()
    
    kwargs = {
        "model": model,
        "messages": messages,
        "temperature": temperature
    }
    
    if response_format:
        kwargs["response_format"] = {"type": response_format}
        
    response = client.chat.completions.create(**kwargs)
    return response.choices[0].message.content
