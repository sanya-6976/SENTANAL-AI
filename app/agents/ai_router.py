from app.agents.investigation_agent import investigation_agent
from app.agents.prediction_agent import prediction_agent
from app.agents.report_agent import report_agent


class AIRouter:

    def route(self, query: str):

        query_lower = query.lower()

        # Prediction Requests
        if any(word in query_lower for word in [
            "hotspot",
            "prediction",
            "predict",
            "risk",
            "crime trend"
        ]):

            return prediction_agent.predict_hotspots()

        # Report Requests
        elif any(word in query_lower for word in [
            "report",
            "summary",
            "generate report"
        ]):

            investigation = investigation_agent.investigate(query)

            return report_agent.generate_report(
                investigation
            )

        # Default → Investigation
        else:

            return investigation_agent.investigate(query)


ai_router = AIRouter()