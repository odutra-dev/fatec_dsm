from apyori import apriori

def encontrar_e_imprimir_regras(lista_transacoes, min_support=0.03, min_confidence=0.6, min_lift=1.1, min_length=2):
    """
    Esta função executa o algoritmo Apriori e imprime as regras encontradas.

    Argumentos:
    lista_transacoes -- Sua lista de transações (lista de listas).
    min_support      -- O suporte mínimo (padrão: 0.03)
    min_confidence   -- A confiança mínima (padrão: 0.6)
    min_lift         -- O lift mínimo (padrão: 1.1)
    min_length       -- O tamanho mínimo da regra (padrão: 2)
    """
    
    print("--- Iniciando limpeza dos dados... ---")
    # Clean the transactions to ensure all items are strings and not None
    # (Exatamente o seu código de limpeza)
    cleaned_transactions = []
    for transaction in lista_transacoes:
        cleaned_transaction = []
        for item in transaction:
            try:
                # Attempt to convert item to string and add if successful
                cleaned_transaction.append(str(item))
            except:
                # Skip item if conversion fails
                pass
        # Only add non-empty transactions
        if cleaned_transaction:
            cleaned_transactions.append(cleaned_transaction)
    
    print(f"Dados limpos. {len(cleaned_transactions)} transações prontas para análise.")
    
    # Executar o algoritmo Apriori
    regras = apriori(cleaned_transactions,
                     min_support=min_support,
                     min_confidence=min_confidence,
                     min_lift=min_lift,
                     min_length=min_length)

    # Converter os resultados em uma lista
    resultados_apriori = list(regras)

    print(f"\n--- Total de regras encontradas: {len(resultados_apriori)} ---")

    # Exibindo as regras encontradas
    if not resultados_apriori:
        print("\nNENHUMA REGRA ENCONTRADA com esses filtros.")
        print("Tente diminuir o 'min_support' ou 'min_lift' ainda mais.")
    else:
        print(f"\n--- Exibindo {len(resultados_apriori)} Regras Encontradas ---")

        for regra in resultados_apriori:
            if not regra.ordered_statistics:
                continue

            estatistica = regra.ordered_statistics[0]

            item_base = ', '.join(estatistica.items_base)
            item_adicionado = ', '.join(estatistica.items_add)

            suporte = round(regra.support * 100, 2)
            confianca = round(estatistica.confidence * 100, 2)
            lift = round(estatistica.lift, 2)

            print(f"REGRA: SE comprar [{item_base}] ENTÃO comprará [{item_adicionado}]")
            print(f"  Suporte: {suporte}%")
            print(f"  Confiança: {confianca}%")
            print(f"  Lift: {lift}")
            print("-" * 30)