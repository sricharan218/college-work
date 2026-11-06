import unittest
from main import (
    BankManager, FlightBooking, TrainBooking, BusBooking,
    get_booking_creator
)


class SingletonTests(unittest.TestCase):
    def setUp(self):
        # Reset singleton state to isolate tests.
        BankManager._instance = None

    def test_only_one_instance_is_created(self):
        first = BankManager("Test Bank")
        second = BankManager("Different Name")
        self.assertIs(first, second)
        self.assertEqual(second.bank_name, "Test Bank")

    def test_bank_operations_share_state(self):
        bank_a = BankManager()
        bank_b = BankManager()
        bank_a.create_account("T001", "Test User", 5000)
        bank_b.deposit("T001", 500)
        self.assertEqual(bank_a.get_balance("T001"), 5500)
        self.assertEqual(bank_b.withdraw("T001", 1000), 4500)

    def test_insufficient_funds(self):
        bank = BankManager()
        bank.create_account("T002", "Test User", 100)
        with self.assertRaises(ValueError):
            bank.withdraw("T002", 200)


class FactoryMethodTests(unittest.TestCase):
    def test_factory_creates_correct_booking_types(self):
        self.assertIsInstance(
            get_booking_creator("flight").create_booking("A", "X", "Y", "D"),
            FlightBooking
        )
        self.assertIsInstance(
            get_booking_creator("train").create_booking("A", "X", "Y", "D"),
            TrainBooking
        )
        self.assertIsInstance(
            get_booking_creator("bus").create_booking("A", "X", "Y", "D"),
            BusBooking
        )

    def test_invalid_choice_is_rejected(self):
        with self.assertRaises(ValueError):
            get_booking_creator("ship")


if __name__ == "__main__":
    unittest.main()
