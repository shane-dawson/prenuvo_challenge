import pytest


@pytest.fixture
def client(app):
    app.config['TESTING'] = True
    client = app.test_client()
    yield client


def test_index(client):
    rv = client.get('/')
    assert b'js-container-root' in rv.data


def test_get_form_data(client):
    rv = client.get('/api/v1/form/')
    data = rv.get_json()
    assert 'fields' in data and 'vocab' in data
