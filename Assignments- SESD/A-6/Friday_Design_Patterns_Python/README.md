# Friday – Design Patterns Assignment (Python)

## Requirements
- Python 3.8 or later
- No third-party packages required

## Run the demonstration
```bash
python main.py
```

## Run the unit tests
```bash
python -m unittest discover -s tests -v
```

## Pattern 1: Singleton – Banking Management System
`BankManager.__new__` controls object creation and stores the one shared instance.
The initialization guard prevents the shared object from being reinitialized.
Account data and configuration are therefore shared through every reference.

## Pattern 2: Factory Method – Travel Booking System
`Booking` is the product interface. `FlightBooking`, `TrainBooking`, and
`BusBooking` are concrete products. `BookingCreator` declares the factory
method, while each concrete creator instantiates one product. The client asks
for a creator based on the travel selection and uses its common `book()` method.

## Files
- `main.py`: both implementations and runnable demonstration
- `tests/test_patterns.py`: unit tests
- `README.md`: run instructions and pattern explanation

This is an educational in-memory example. A production banking system would
require persistent storage, transaction safety, authentication, authorization,
audit logs and concurrency controls. Travel booking would require live
availability checks, payment integration and booking-provider APIs.
