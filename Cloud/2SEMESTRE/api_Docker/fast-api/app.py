import fastapi

app = fastapi.FastAPI()

nome = "Cloud Computing"

@app.get("/")
def read_nome():
    return {"Class": nome}
