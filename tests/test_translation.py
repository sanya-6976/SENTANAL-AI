from app.services.translation_service import translation_service

print("Test started")

text = """
एफआईआर संख्या: FIR-001

अपराध: चोरी

स्थान: कनॉट प्लेस

संदिग्ध व्यक्ति काले रंग की हुडी पहनकर मोटरसाइकिल से भाग गया।
"""

result = translation_service.translate(text)

print("\n========== TRANSLATION ==========\n")

print(result)

print("\n================================")