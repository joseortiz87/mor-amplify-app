import requests
from datetime import datetime
from fastapi import FastAPI, Body
from pydantic import BaseModel
from requests import Response

app = FastAPI()
# Handling URL of the endpoint and API Key
url = "https://jdx6dare2rbftgbaaibujpseuq.appsync-api.us-west-1.amazonaws.com/graphql"
headers = {
    "x-api-key": "da2-7odl6joouzdozpjqfcfhbfzlse",
    "Content-Type": "application/json"
}


def execute_query(query):

    response = requests.post(url, json={'query': query}, headers=headers)
    return response.json()

class UserModel(BaseModel):
    name: str
    email: str
    date_of_birth: datetime
    user_type: str

@app.post("/create_user")
def create_user(user: UserModel = Body(...)):
    date_of_birth= user.date_of_birth = user.date_of_birth.strftime("%Y-%m-%d")
    query = f"""
    mutation MyMutation {{
        createUsers(input: {{
            date_of_birth: "{date_of_birth}",
            email: "{user.email}",
            name: "{user.name}",
            type: "{user.user_type}"
        }}) {{
            createdAt
            date_of_birth
            email
            id
            name
            type
            updatedAt
            user_id
        }}
    }}"""
    result = execute_query(query)
    return result


@app.get("/get_users")
def list_users(limit=10):
    query = """
    query MyQuery {
        listUsers(limit: %d) {
            items {
                email
                name
                id
                type
                user_id
                updatedAt
                date_of_birth
            }
        }
    }""" % limit

    result = execute_query(query)
    print("Result of listing users:")
    return result


@app.get("/get_user/{id}")
def get_user_info_by_id(id):
    query = """
    query MyQuery {
        getUsers(id: "%s") {
            updatedAt
            type
            user_id
            id
            name
            email
            date_of_birth
            createdAt
        }
    }""" %  id

    result = execute_query(query)
    return result


@app.put("/update_user/{id}")
def update_name_of_user(id, name):
    query = """
    mutation MyMutation {
        updateUsers(input: {
            id: "%s",
            name: "%s"
        }) {
            createdAt
            date_of_birth
            email
            id
            name
            type
            updatedAt
            user_id
        }
    }""" % (id, name)

    result = execute_query(query)

    return result


@app.delete("/delete_user/{user_id}")
def delete_user(user_id):
    query = """
    mutation MyMutation {
        deleteUsers(input: {id: "%s"}) {
            user_id
            type
            updatedAt
            name
            id
            email
            date_of_birth
        }
    }""" % user_id

    result = execute_query(query)
    return result
