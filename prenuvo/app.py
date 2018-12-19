from flask import Flask, render_template


def create_app():
    app = Flask(__name__, static_folder='static', template_folder='templates')
    from prenuvo.views import api
    app.register_blueprint(api, url_prefix='/api/v1')

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def index_view(path):
        return render_template('index.html')

    return app
