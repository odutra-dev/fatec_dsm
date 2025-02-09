package br.edu.fatecpg.viacep.interfaces

import br.edu.fatecpg.viacep.models.Endereco
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path

interface IViaCEPService {

    @GET("{cep}/json")
    fun consultarCEP(@Path("cep") cep:String):Call<Endereco>
}