from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.python import BranchPythonOperator
from airflow.operators.bash import BashOperator
from airflow.operators.email import EmailOperator
import pandas as pd
import requests
import json
from datetime import datetime
import smtplib
from email.mime.text import MIMEText


def extract():
    url = "https://api.themoviedb.org/3/tv/popular?language=pt-BR&page=1"

    headers = {
        "accept": "application/json",
        "Authorization": "Bearer your_token"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return json.loads(response.content)


def transform(ti):
    data = ti.xcom_pull(task_ids='extract')

    if data is not None:
        df = pd.DataFrame(data['results'])

        # Exemplos de colunas que você pode escolher
        df = df[['name', 'popularity', 'vote_average',
                 'overview', 'first_air_date', 'poster_path']]

        json_data = df.to_json(orient='records')
        return json_data


def valid_branch(ti):
    data = ti.xcom_pull(task_ids='transform')
    if data is not None:
        return 'valid'
    else:
        return 'invalid'


def send_email(ti):
    filmes_str = ti.xcom_pull(task_ids='transform')

    filmes = json.loads(filmes_str)

    html_content = """
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8" />
        <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
        }
        .table-container {
            width: 100%;
            margin: 0 auto;
            max-width: 800px;
        }
        h2 {
            color: #0073e6;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th,
        td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
        }
        th {
            background-color: #0073e6;
            color: #fff;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .poster {
            width: 50px;
        }
        .overview {
            font-size: 0.9em;
            color: #555;
        }
        </style>
    </head>
    <body>
        <div class="table-container">
        <h2>Top 10 Filmes e Séries Populares</h2>
        <table>
            <tr>
            <th>Poster</th>
            <th>Nome</th>
            <th>Data de Lançamento</th>
            <th>Popularidade</th>
            <th>Pontuação</th>
            <th>Descrição</th>
            </tr>
    """

    # Iterando sobre os 10 filmes e adicionando as informações na tabela
    for filme in filmes[:10]:  # Pegando os 10 primeiros filmes
        html_content += f"""
            <tr>
            <td>
                <img src="https://image.tmdb.org/t/p/w200{filme.get('poster_path', '')}" alt="Poster" class="poster" />
            </td>
            <td>{filme['name']}</td>
            <td>{filme['first_air_date']}</td>
            <td>{filme['popularity']}</td>
            <td>{filme['vote_average']}</td>
            <td class="overview">{filme['overview']}</td>
            </tr>
        """

    # Fechando a tabela e o HTML
    html_content += """
        </table>
        </div>
    </body>
    </html>
    """

    email = EmailOperator(
        task_id='send_email',
        to='example@gmail.com',
        subject='Filmes Populares',
        html_content=html_content
    )

    return email.execute(context=ti)


with DAG('API_TMDB', start_date=datetime(2024, 10, 31),
         schedule_interval='30 * * * *', catchup=False, tags=['API', 'TMDB']) as dag:

    extract_task = PythonOperator(
        task_id='extract',
        python_callable=extract
    )

    transform_task = PythonOperator(
        task_id='transform',
        python_callable=transform,
        provide_context=True,
    )

    send_email_task = PythonOperator(
        task_id='send_email',
        python_callable=send_email,
        provide_context=True,

    )

    send_email_error_task = EmailOperator(
        task_id='send_error_email',
        to='example@gmail.com',
        subject='Erro no Sistema - Airflow',
        html_content="""
        <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificação de Erro</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #ff4d4f;
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .header p {
            margin: 5px 0 0;
            font-size: 14px;
        }
        .content {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .content h2 {
            color: #ff4d4f;
            font-size: 20px;
            margin-top: 0;
        }
        .content p {
            margin: 15px 0;
        }
        .content .details {
            background-color: #f9f9f9;
            padding: 15px;
            border-left: 5px solid #ff4d4f;
            border-radius: 4px;
            color: #555555;
        }
        .footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #888888;
        }
        .footer a {
            color: #ff4d4f;
            text-decoration: none;
        }
    </style>
</head>
<body>

    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>Notificação de Erro</h1>
            <p>Algo deu errado no sistema</p>
        </div>

        <!-- Content -->
        <div class="content">
            <h2>Detalhes do Erro</h2>
            <p>Ocorreu um erro durante a execução de uma tarefa no sistema. Por favor, revise os detalhes abaixo e entre em contato com o suporte, se necessário.</p>
            
            <div class="details">
                <p><strong>Erro:</strong> Conexão com o servidor SMTP falhou.</p>
                <p><strong>Código do Erro:</strong> 111 (Connection Refused)</p>
                <p><strong>Data/Hora:</strong> 03/11/2024 12:11 UTC</p>
                <p><strong>Tarefa:</strong> Envio de E-mail</p>
            </div>

            <p>Para resolver esse problema, verifique as configurações de rede ou a disponibilidade do servidor SMTP. Se o problema persistir, entre em contato com o administrador do sistema.</p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Este é um e-mail automático, por favor, não responda.</p>
            <p><a href="https://suporte.suaempresa.com">Contate o Suporte</a> | <a href="https://suaempresa.com">Visite nosso site</a></p>
        </div>
    </div>

</body>
</html>
        """,

    )

    valid_branch_task = BranchPythonOperator(
        task_id='valid_branch',
        python_callable=valid_branch
    )

    valid_task = BashOperator(
        task_id='valid',
        bash_command='echo "valid!"'
    )

    invalid_task = BashOperator(
        task_id='invalid',
        bash_command='echo "invalid!"'
    )

    extract_task >> transform_task >> valid_branch_task >> [
        valid_task, invalid_task]

    send_email_task << valid_task

    send_email_error_task << invalid_task