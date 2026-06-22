# ==========================================
# 14. Inheritance
# ==========================================

class Animal:
    def __init__(self, name):
        self.name = name

    def make_sound(self):
        print(f"{self.name} makes a generic sound.")

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

    def make_sound(self):
        print(f"{self.name} the {self.breed} barks: Woof! Woof!")

class Flyer:
    def fly(self):
        print("I can fly!")

class Swimmer:
    def swim(self):
        print("I can swim!")

class Duck(Flyer, Swimmer):
    pass

def inheritance_demo():
    print("--- Single Inheritance & Overriding ---")
    generic_animal = Animal("Creature")
    generic_animal.make_sound()

    my_dog = Dog("Buddy", "Golden Retriever")
    my_dog.make_sound()

    print("\n--- Multiple Inheritance ---")
    donald = Duck()
    donald.fly()
    donald.swim()

    print("\n--- Method Resolution Order (MRO) for Duck ---")
    print([cls.__name__ for cls in Duck.mro()])

if __name__ == "__main__":
    inheritance_demo()
