import logging

from flask import jsonify, Blueprint

from prenuvo.forms import symptom_form

logger = logging.getLogger(__name__)

api = Blueprint('api', __name__)


@api.route('/form/')
def form():
    return jsonify(symptom_form)


def json_error_response(status_code, reason, **kwargs):
    return jsonify({
        'status': status_code,
        'error': reason
    })
