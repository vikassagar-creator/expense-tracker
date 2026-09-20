import requests

BASE_URL = "http://127.0.0.1:8000"
USERNAME = "vikas_demo"          # or "vikas", whichever account you're using
PASSWORD = "V!kas1234"

# 1. Register (safe to run even if the user already exists — we just
#    ignore a 400 "already exists" error and move on to login)
register_res = requests.post(f"{BASE_URL}/users/register", json={
    "username": USERNAME,
    "email": f"{USERNAME}@example.com",
    "password": PASSWORD,
})
if register_res.status_code >= 400:
    print(f"Register skipped: {register_res.status_code} {register_res.text}")
else:
    print("Registered new user.")

# 2. Log in and get JWT token
login_res = requests.post(f"{BASE_URL}/users/login", json={
    "username": USERNAME,
    "password": PASSWORD,
})
login_res.raise_for_status()
token = login_res.json()["access_token"]
headers = {"Authorization": f"Bearer {token}"}

# 3. Wipe any existing expenses on this account first, so re-running
#    this script never creates duplicates.
existing = requests.get(f"{BASE_URL}/expenses/", headers=headers)
existing.raise_for_status()
existing_expenses = existing.json()

if existing_expenses:
    print(f"Deleting {len(existing_expenses)} existing expenses...")
    for exp in existing_expenses:
        del_res = requests.delete(f"{BASE_URL}/expenses/{exp['id']}", headers=headers)
        if del_res.status_code >= 400:
            print(f"  Failed to delete id={exp['id']}: {del_res.status_code} {del_res.text}")
else:
    print("No existing expenses to delete.")

# 4. Seed fresh data
expenses = [
    # --- Apr 2026 ---
    {"title": "Grocery shopping", "amount": 2450, "category": "Food", "date": "2026-04-03", "payment_mode": "UPI"},
    {"title": "Uber to airport", "amount": 890, "category": "Transport", "date": "2026-04-08", "payment_mode": "Card"},
    {"title": "Netflix subscription", "amount": 649, "category": "Entertainment", "date": "2026-04-10", "payment_mode": "Card"},
    {"title": "New headphones", "amount": 3200, "category": "Shopping", "date": "2026-04-15", "payment_mode": "Net Banking"},
    {"title": "Electricity bill", "amount": 1800, "category": "Other", "date": "2026-04-22", "payment_mode": "UPI"},

    # --- May 2026 ---
    {"title": "Dinner with friends", "amount": 1250, "category": "Food", "date": "2026-05-02", "payment_mode": "Cash"},
    {"title": "Metro card recharge", "amount": 500, "category": "Transport", "date": "2026-05-06", "payment_mode": "UPI"},
    {"title": "Movie tickets", "amount": 720, "category": "Entertainment", "date": "2026-05-11", "payment_mode": "Card"},
    {"title": "Sneakers", "amount": 4500, "category": "Shopping", "date": "2026-05-18", "payment_mode": "Card"},
    {"title": "Internet bill", "amount": 999, "category": "Other", "date": "2026-05-25", "payment_mode": "Net Banking"},

    # --- Jun 2026 ---
    {"title": "Weekly groceries", "amount": 2180, "category": "Food", "date": "2026-06-01", "payment_mode": "UPI"},
    {"title": "Cab to office", "amount": 340, "category": "Transport", "date": "2026-06-05", "payment_mode": "Cash"},
    {"title": "Spotify subscription", "amount": 199, "category": "Entertainment", "date": "2026-06-09", "payment_mode": "Card"},
    {"title": "Office chair", "amount": 5600, "category": "Shopping", "date": "2026-06-14", "payment_mode": "Net Banking"},
    {"title": "Phone bill", "amount": 599, "category": "Other", "date": "2026-06-20", "payment_mode": "UPI"},

    # --- Jul 2026 ---
    {"title": "Lunch orders", "amount": 1890, "category": "Food", "date": "2026-07-03", "payment_mode": "UPI"},
    {"title": "Fuel", "amount": 2200, "category": "Transport", "date": "2026-07-07", "payment_mode": "Card"},
    {"title": "Concert tickets", "amount": 3500, "category": "Entertainment", "date": "2026-07-12", "payment_mode": "Card"},
    {"title": "T-shirts", "amount": 1600, "category": "Shopping", "date": "2026-07-19", "payment_mode": "UPI"},
    {"title": "Gym membership", "amount": 2000, "category": "Other", "date": "2026-07-25", "payment_mode": "Net Banking"},

    # --- Aug 2026 ---
    {"title": "Grocery run", "amount": 2700, "category": "Food", "date": "2026-08-04", "payment_mode": "UPI"},
    {"title": "Flight ticket", "amount": 6800, "category": "Transport", "date": "2026-08-10", "payment_mode": "Card"},
    {"title": "Gaming subscription", "amount": 449, "category": "Entertainment", "date": "2026-08-16", "payment_mode": "Card"},
    {"title": "Laptop bag", "amount": 1950, "category": "Shopping", "date": "2026-08-22", "payment_mode": "UPI"},
    {"title": "Water purifier service", "amount": 850, "category": "Other", "date": "2026-08-28", "payment_mode": "Cash"},

    # --- Sep 2026 (this month — extra entries for a richer "This Month" view) ---
    {"title": "Weekly groceries", "amount": 2350, "category": "Food", "date": "2026-09-01", "payment_mode": "UPI"},
    {"title": "Cab to airport", "amount": 610, "category": "Transport", "date": "2026-09-02", "payment_mode": "Card"},
    {"title": "Laptop bag", "amount": 1950, "category": "Shopping", "date": "2026-09-02", "payment_mode": "UPI"},
    {"title": "Coffee with team", "amount": 480, "category": "Food", "date": "2026-09-04", "payment_mode": "Cash"},
    {"title": "Prime Video subscription", "amount": 299, "category": "Entertainment", "date": "2026-09-05", "payment_mode": "Card"},
    {"title": "Fuel refill", "amount": 1800, "category": "Transport", "date": "2026-09-06", "payment_mode": "UPI"},
    {"title": "New keyboard", "amount": 2600, "category": "Shopping", "date": "2026-09-08", "payment_mode": "Net Banking"},
    {"title": "Broadband bill", "amount": 999, "category": "Other", "date": "2026-09-09", "payment_mode": "UPI"},
    {"title": "Dinner out", "amount": 1450, "category": "Food", "date": "2026-09-10", "payment_mode": "Card"},
    {"title": "Bookstore purchase", "amount": 890, "category": "Shopping", "date": "2026-09-11", "payment_mode": "UPI"},
    {"title": "Movie night", "amount": 640, "category": "Entertainment", "date": "2026-09-12", "payment_mode": "Card"},
    {"title": "Cab rides (weekly)", "amount": 950, "category": "Transport", "date": "2026-09-13", "payment_mode": "Cash"},
    {"title": "Grocery top-up", "amount": 1320, "category": "Food", "date": "2026-09-15", "payment_mode": "UPI"},
    {"title": "Mobile recharge", "amount": 499, "category": "Other", "date": "2026-09-16", "payment_mode": "UPI"},
    {"title": "Birthday gift", "amount": 2200, "category": "Shopping", "date": "2026-09-18", "payment_mode": "Card"},
    {"title": "Weekend brunch", "amount": 1100, "category": "Food", "date": "2026-09-19", "payment_mode": "Card"},
    {"title": "Gym membership renewal", "amount": 2000, "category": "Other", "date": "2026-09-20", "payment_mode": "Net Banking"},
]

for exp in expenses:
    res = requests.post(f"{BASE_URL}/expenses/", json=exp, headers=headers)
    if res.status_code >= 400:
        print(f"Failed: {exp['title']} -> {res.status_code} {res.text}")
    else:
        print(f"Added: {exp['title']}")