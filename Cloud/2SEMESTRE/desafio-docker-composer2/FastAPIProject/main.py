from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from typing import List
from os import getenv

# URL do banco PostgreSQL
# Formato: postgresql://usuario:senha@host:porta/banco
DATABASE_URL = getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/todolist")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Modelo no banco
class TodoDB(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, default="")
    completed = Column(Boolean, default=False)


# Criar tabelas no banco
Base.metadata.create_all(bind=engine)


# Modelos Pydantic
class TodoCreate(BaseModel):
    title: str
    description: str = ""


class TodoResponse(BaseModel):
    id: int
    title: str
    description: str
    completed: bool

    class Config:
        orm_mode = True


app = FastAPI()


# Dependency para pegar sessão do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Bem-vindo à To-Do API com PostgreSQL 🚀"}


# Criar uma tarefa
@app.post("/todos", response_model=TodoResponse)
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    db_todo = TodoDB(title=todo.title, description=todo.description)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


# Listar todas as tarefas
@app.get("/todos", response_model=List[TodoResponse])
def list_todos(db: Session = Depends(get_db)):
    return db.query(TodoDB).all()


# Obter uma tarefa pelo id
@app.get("/todos/{todo_id}", response_model=TodoResponse)
def get_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(TodoDB).filter(TodoDB.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return todo


# Atualizar tarefa
@app.put("/todos/{todo_id}", response_model=TodoResponse)
def update_todo(todo_id: int, todo: TodoCreate, db: Session = Depends(get_db)):
    db_todo = db.query(TodoDB).filter(TodoDB.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")

    db_todo.title = todo.title
    db_todo.description = todo.description
    db.commit()
    db.refresh(db_todo)
    return db_todo


# Marcar como concluída
@app.patch("/todos/{todo_id}/complete", response_model=TodoResponse)
def complete_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = db.query(TodoDB).filter(TodoDB.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")

    db_todo.completed = True
    db.commit()
    db.refresh(db_todo)
    return db_todo


# Deletar tarefa
@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = db.query(TodoDB).filter(TodoDB.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")

    db.delete(db_todo)
    db.commit()
    return {"message": "Tarefa deletada com sucesso"}
