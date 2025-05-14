# Storage Contacts

> ## Objetivo
>
> Explorar o funcionamento interno do algoritmo de criptografia simétrica AES-256 e praticar sua

### Introdução Teórica

---

Em um mundo que a tecnologia evolui cada dia rapidamente, a segurança da informação se tornou uma preocupação global. A criptografia, uma ferramenta fundamental para proteger dados sensíveis, e uma das ferramentas mais utilizadas para garantir a confidencialidade e integridade dos dados. Um algoritmo que se destaca é **AES-256**, um algoritmo de criptografia simétrica e que dizem ser imbátivel.

O algoritmo AES têm 3 modos de operação: **AES-128**, **AES-192** e **AES-256**. A principal diferença entre eles reside na quantidade de bits usados para criptografia.

**AES-128**: Usa uma chave de 128 bits e realiza 10 rodadas de criptografia. Apesar de ser o mais rápido entre os três, oferece o menor nível de segurança, mas ainda assim é robusto para a maioria das aplicações.

**AES-192**: Com uma chave de 192 bits, esta versão realiza 12 rodadas de criptografia. Oferece um nível intermediário de segurança, equilibrando eficácia e eficiência.

**AES-256**: Sendo o mais seguro dos três, utiliza uma chave de 256 bits e realiza 14 rodadas de criptografia. Além disso, com a tecnologia disponível atualmente, consideramos essa versão praticamente inquebrável. Portanto, isso torna o AES-256 a escolha preferida para situações que exigem alta confidencialidade e segurança.

O AES-256 passa por uma serie de etapas para realizar a criptografia, sendo elas:

**Criptografia Simétrica**: A criptografia simétrica consiste em criptografar e descriptografar dados utilizando a mesma chave para ambas as operações.

**256 bits de Segurança**: O AES-256 oferece 256 bits de segurança, o que significa que ele pode criptografar e descriptografar dados de 256 bits de tamanho. Além de ser virtualmente imune a ataques de forçagem bruta.

**Processo de Criptografia**: 14 rodadas de substituição, permutação e mistura de dados, tornando a informação original indecifrável sem a chave correta.

[![Imagem demostrativa de como o AES-256 funciona](https://pronnus.com.br/wp-content/uploads/2024/02/criptografia-256-bits-1024x576.webp)](https://pronnus.com.br/blog/criptografia-aes-256-o-padrao-de-criptografia-inquebravel/)
Imagem demostrativa de como o AES-256 funciona

### Implementação

---

Eu implementei o Algoritmo usando CBC, que é Advanced Encryption Standard com uma chave de 256 bits no modo Cipher Block Chaining (CBC). Trata-se de um tipo de algoritmo de criptografia de chave simétrica que utiliza uma chave de 256 bits para codificar e decodificar dados.

> A parte "CBC" do nome refere-se ao modo de cifra em blocos utilizado com o algoritmo. No modo Cipher Block Chaining (CBC), cada bloco de texto simples (plaintext) é combinado (XOR) com o bloco de texto cifrado anterior antes de ser criptografado. Isso garante que os blocos de texto cifrados sejam independentes uns dos outros, o que torna o algoritmo mais seguro.

### Referências

---

https://pronnus.com.br/blog/criptografia-aes-256-o-padrao-de-criptografia-inquebravel/
https://docs.anchormydata.com/docs/what-is-aes-256-cbc
