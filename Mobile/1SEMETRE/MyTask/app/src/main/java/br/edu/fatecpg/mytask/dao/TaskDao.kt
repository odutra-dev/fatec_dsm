package br.edu.fatecpg.mytask.dao

import br.edu.fatecpg.mytask.models.Task

class TaskDao {
    companion object {
        private val tasks:MutableList<Task> = mutableListOf()
    }

    fun addTask(task: Task){
        tasks.add(task)
    }

    fun getTasks():List<Task>{


        return tasks.filter { task -> !task.check }
    }
}