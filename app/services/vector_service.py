import json
from pathlib import Path


class VectorService:
    def __init__(self):
        self.db_path = Path("data/knowledge_base/firs/vectors.json")

        if not self.db_path.exists():
            self.db_path.write_text("[]")

    def save(self, document: str, embedding: list):
        data = json.loads(self.db_path.read_text())

        data.append(
            {
                "document": document,
                "embedding": embedding,
            }
        )

        self.db_path.write_text(json.dumps(data, indent=4))
    def load(self):
        return json.loads(self.db_path.read_text())

vector_service = VectorService()