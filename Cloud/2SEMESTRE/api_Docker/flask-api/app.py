import fastapi
import uvicorn

app = fastapi.FastAPI()

nome = "Cloud Computing"

@app.get("/")
def read_nome():
    return {"Class": nome}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)