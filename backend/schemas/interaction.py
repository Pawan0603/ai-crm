from pydantic import BaseModel

class Interaction(BaseModel):
    hcpName: str
    interactionType: str
    date: str
    time: str
    attendees: str
    topics: str
    outcomes: str
    followUp: str
    sentiment: str