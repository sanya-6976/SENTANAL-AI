from app.services.gemini_service import gemini_service

def main():
    print("=" * 50)
    print("🛡️ Sentinel AI")
    print("=" * 50)

    while True:
        question = input("\nAsk Sentinel AI (type 'exit' to quit): ")

        if question.lower() == "exit":
            print("\nGoodbye!")
            break

        response = gemini_service.ask(question)

        print("\nSentinel AI:\n")
        print(response)


if __name__ == "__main__":
    main()