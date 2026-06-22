# ==========================================
# 15. Iterators & Generators
# ==========================================

class CountDown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        
        value = self.current
        self.current -= 1
        return value

def countdown_generator(start):
    current = start
    while current > 0:
        yield current
        current -= 1

def iterators_demo():
    print("--- Custom Iterator ---")
    counter = CountDown(3)
    for num in counter:
        print(num)

    print("\n--- Generator ---")
    gen = countdown_generator(3)
    for num in gen:
        print(num)
        
if __name__ == "__main__":
    iterators_demo()
