"""
Friday Design Patterns Assignment
1. Singleton: Banking Management System
2. Factory Method: Travel Booking System

Run:
    python main.py
"""

from abc import ABC, abstractmethod


# ---------------------------------------------------------------------------
# 1. SINGLETON PATTERN - BANKING MANAGEMENT SYSTEM
# ---------------------------------------------------------------------------

class BankManager:
    """Centralized manager: every construction returns the same instance."""
    _instance = None

    def __new__(cls, bank_name="City Bank"):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self, bank_name="City Bank"):
        # Prevent re-initialization when another reference is requested.
        if self._initialized:
            return
        self.bank_name = bank_name
        self.configuration = {
            "currency": "INR",
            "minimum_balance": 1000,
            "daily_withdrawal_limit": 50000,
        }
        self.accounts = {}
        self._initialized = True

    def create_account(self, account_number, customer_name, opening_balance=0):
        if account_number in self.accounts:
            raise ValueError("Account number already exists.")
        if opening_balance < 0:
            raise ValueError("Opening balance cannot be negative.")
        self.accounts[account_number] = {
            "customer": customer_name,
            "balance": float(opening_balance),
        }
        return f"Account {account_number} created for {customer_name}."

    def get_balance(self, account_number):
        return self._get_account(account_number)["balance"]

    def deposit(self, account_number, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be greater than zero.")
        account = self._get_account(account_number)
        account["balance"] += amount
        return account["balance"]

    def withdraw(self, account_number, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be greater than zero.")
        if amount > self.configuration["daily_withdrawal_limit"]:
            raise ValueError("Daily withdrawal limit exceeded.")
        account = self._get_account(account_number)
        if amount > account["balance"]:
            raise ValueError("Insufficient funds.")
        account["balance"] -= amount
        return account["balance"]

    def update_configuration(self, key, value):
        if key not in self.configuration:
            raise KeyError(f"Unknown configuration setting: {key}")
        self.configuration[key] = value

    def _get_account(self, account_number):
        if account_number not in self.accounts:
            raise KeyError(f"Account {account_number} does not exist.")
        return self.accounts[account_number]


# ---------------------------------------------------------------------------
# 2. FACTORY METHOD PATTERN - TRAVEL BOOKING SYSTEM
# ---------------------------------------------------------------------------

class Booking(ABC):
    """Product interface for all travel booking types."""

    def __init__(self, passenger, origin, destination, travel_date):
        self.passenger = passenger
        self.origin = origin
        self.destination = destination
        self.travel_date = travel_date

    @abstractmethod
    def confirm(self):
        pass


class FlightBooking(Booking):
    def confirm(self):
        return (f"Flight booking confirmed for {self.passenger}: "
                f"{self.origin} -> {self.destination} on {self.travel_date}.")


class TrainBooking(Booking):
    def confirm(self):
        return (f"Train booking confirmed for {self.passenger}: "
                f"{self.origin} -> {self.destination} on {self.travel_date}.")


class BusBooking(Booking):
    def confirm(self):
        return (f"Bus booking confirmed for {self.passenger}: "
                f"{self.origin} -> {self.destination} on {self.travel_date}.")


class BookingCreator(ABC):
    """Creator declares the factory method and uses the created product."""

    @abstractmethod
    def create_booking(self, passenger, origin, destination, travel_date):
        pass

    def book(self, passenger, origin, destination, travel_date):
        booking = self.create_booking(
            passenger, origin, destination, travel_date
        )
        return booking.confirm()


class FlightBookingCreator(BookingCreator):
    def create_booking(self, passenger, origin, destination, travel_date):
        return FlightBooking(passenger, origin, destination, travel_date)


class TrainBookingCreator(BookingCreator):
    def create_booking(self, passenger, origin, destination, travel_date):
        return TrainBooking(passenger, origin, destination, travel_date)


class BusBookingCreator(BookingCreator):
    def create_booking(self, passenger, origin, destination, travel_date):
        return BusBooking(passenger, origin, destination, travel_date)


def get_booking_creator(choice):
    """Select the matching creator without exposing construction to the client."""
    creators = {
        "flight": FlightBookingCreator,
        "train": TrainBookingCreator,
        "bus": BusBookingCreator,
    }
    key = choice.strip().lower()
    if key not in creators:
        raise ValueError("Invalid travel type. Choose flight, train, or bus.")
    return creators[key]()


def demo():
    print("=" * 65)
    print("1. SINGLETON PATTERN - BANKING MANAGEMENT SYSTEM")
    print("=" * 65)

    bank1 = BankManager("City Bank")
    bank2 = BankManager("Another Bank")
    print("Are both references the same object?", bank1 is bank2)
    print("Bank name:", bank2.bank_name)
    print(bank1.create_account("AC1001", "Ananya", 10000))
    bank1.deposit("AC1001", 2500)
    bank1.withdraw("AC1001", 1000)
    print("Final balance:", bank2.get_balance("AC1001"))
    print("Shared configuration:", bank2.configuration)

    print("\n" + "=" * 65)
    print("2. FACTORY METHOD PATTERN - TRAVEL BOOKING SYSTEM")
    print("=" * 65)
    for travel_type in ("flight", "train", "bus"):
        creator = get_booking_creator(travel_type)
        print(creator.book(
            "Rahul", "Chennai", "Bengaluru", "2026-12-15"
        ))


if __name__ == "__main__":
    demo()
