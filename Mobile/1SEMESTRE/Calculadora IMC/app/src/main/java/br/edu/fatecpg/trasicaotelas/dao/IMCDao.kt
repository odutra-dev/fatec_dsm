package br.edu.fatecpg.trasicaotelas.dao

import br.edu.fatecpg.trasicaotelas.model.IMC

class IMCDao {
    companion object{
        private var IMC:IMC? = null
    }

    fun cadastroIMC(IMC:IMC){
        Companion.IMC = IMC
    }
    fun exibirIMC():IMC{
        return Companion.IMC?:IMC()
    }
}