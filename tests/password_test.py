from backend.auth.password import hash_password, verify_password

password = "Sentinel123!"

hashed = hash_password(password)

print(hashed)

print(
    verify_password(password, hashed)
)