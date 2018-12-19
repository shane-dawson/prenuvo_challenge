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


def test_get_image_list(client):
    rv = client.get('/api/v1/images/')
    data = rv.get_json()
    assert len(data) and all(len(d.keys()) == 3 for d in data)


def test_get_image(client):
    rv = client.get('static/image/862625ef/1ed58958/bw-gif.gif')
    assert rv.content_type == 'image/gif' and len(rv.data)
    pass
