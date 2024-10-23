import requests
from datetime import datetime

# Handling URL of the endpoint and API Key
url = "https://jdx6dare2rbftgbaaibujpseuq.appsync-api.us-west-1.amazonaws.com/graphql"
headers = {
    "x-api-key": "da2-7odl6joouzdozpjqfcfhbfzlse",
    "Content-Type": "application/json"
}


def execute_query(query):
    """
    Sends a query to the API and returns the response

    Args:
        query (str): The query as a string

    Returns:
        dict: The response from the API
    """
    response = requests.post(url, json={'query': query}, headers=headers)
    return response.json()


# CREATE
def create_user(name, email, date_of_birth, user_type="ADMIN"):
    """
    Creates a new user in the database

    Args:
        name (str): The name of the user
        email (str): The email of the user
        date_of_birth (str|datetime): The date of birth of the user in 'YYYY-MM-DD' format
        user_type (str): The type of user, defaults to "ADMIN", could be "ADMIN" or "CLIENT"

    Returns:
        None
    """
    # If the date of birth is not in the correct format, convert it to 'YYYY-MM-DD'
    if isinstance(date_of_birth, datetime):
        date_of_birth = date_of_birth.strftime('%Y-%m-%d')

    query = """
    mutation MyMutation {
        createUsers(input: {
            date_of_birth: "%s",
            email: "%s",
            name: "%s",
            type: "%s"
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
    }""" % (date_of_birth, email, name, user_type)

    result = execute_query(query)
    print("Result of creating user:")
    print(result)


# READ
def list_users(limit=10):
    """
    Lists all users in the database

    Args:
        limit (int): The number of users to return, defaults to 10 (maximum is 10)

    Returns:
        None
    """
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
    print(result)


# READ
def get_user_info_by_id(user_id):
    """
    Gets the information of a specific user by their ID

    Args:
        user_id (str): The user ID to retrieve

    Returns:
        None
    """
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
    }""" % user_id

    result = execute_query(query)
    print("Result of getting user by ID:")
    print(result)


# UPDATE
def update_name_of_user(user_id, name):
    """
    Updates the name of a user in the database

    Args:
        user_id (str): The user ID to update
        name (str): The new name of the user

    Returns:
        None
    """
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
    }""" % (user_id, name)

    result = execute_query(query)
    print("Result of updating user:")
    print(result)


# DELETE
def delete_user(user_id):
    """
    Deletes a user from the database by their ID

    Args:
        user_id (str): The user ID to delete

    Returns:
        None
    """
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
    print("Result of deleting user:")
    print(result)
