from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database.connection import get_db
from backend.auth.dependencies import get_current_active_user
from backend.auth.models import CurrentUser
from backend.ai.service import ai_service

ai_router = APIRouter(prefix="/ai", tags=["ai"])

# ── Pydantic Request Contracts ───────────────────────────────────────────────

class OCRRequest(BaseModel):
    image_path: str


class AssistantRequest(BaseModel):
    question: str


class ReportRequest(BaseModel):
    fir_id: str


# ── AI Endpoints ─────────────────────────────────────────────────────────────

@ai_router.post("/ocr")
def perform_ocr(
    request: OCRRequest,
    current_user: CurrentUser = Depends(get_current_active_user),
):
    """Extract text content from an image file path (with LLM fallback)."""
    text = ai_service.perform_ocr(file_path=request.image_path)
    return {"image_path": request.image_path, "extracted_text": text}


@ai_router.post("/assistant")
def ask_assistant(
    request: AssistantRequest,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_active_user),
):
    """Consult the AI Assistant with a natural language query about cases."""
    response = ai_service.ask_assistant(db=db, user=current_user, question=request.question)
    return {"question": request.question, "response": response}


@ai_router.post("/report")
def generate_report(
    request: ReportRequest,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_active_user),
):
    """Generate a highly structured investigative report summary for a specific FIR case."""
    report = ai_service.generate_report(db=db, user=current_user, fir_id=request.fir_id)
    return {"fir_id": request.fir_id, "report": report}
