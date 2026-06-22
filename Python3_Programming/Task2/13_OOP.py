# ==========================================
# 13. OOP (Object-Oriented Programming)
# ==========================================

class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            print(f"Deposited ${amount}. New balance: ${self.balance}")
        else:
            print("Deposit amount must be positive.")

    def withdraw(self, amount):
        if amount > self.balance:
            print("Funds Unavailable! Cannot withdraw.")
        else:
            self.balance -= amount
            print(f"Withdrew ${amount}. New balance: ${self.balance}")

    def __str__(self):
        return f"BankAccount(owner='{self.owner}', balance=${self.balance})"

def oop_demo():
    print("--- OOP and Mini Project: Bank Account ---")
    
    acct1 = BankAccount("Umair", 100)
    acct2 = BankAccount("Alice", 500)

    print("Account 1:", acct1)
    print("Account 2:", acct2)

    print("\nTransactions for Account 1:")
    acct1.deposit(50)
    acct1.withdraw(20)
    acct1.withdraw(200)

if __name__ == "__main__":
    oop_demo()
