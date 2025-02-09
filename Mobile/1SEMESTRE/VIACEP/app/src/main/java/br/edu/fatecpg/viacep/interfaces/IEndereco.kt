package br.edu.fatecpg.viacep.interfaces

import android.content.Context
import br.edu.fatecpg.viacep.models.Endereco

interface IEndereco {
    fun ConsultarEndereco(context: Context, cep:String)
    fun DevolverEndereco():List<Endereco>
}