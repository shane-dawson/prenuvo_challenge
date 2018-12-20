import logging

from flask import jsonify, Blueprint, send_from_directory, current_app

from prenuvo.forms import symptom_form
from prenuvo.utils import get_img_dimensions, get_image_paths

logger = logging.getLogger(__name__)

api = Blueprint('api', __name__)


@api.route('/form/')
def form():
    return jsonify(symptom_form)


@api.route('/image/<path:filename>')
def image(filename):
    return send_from_directory('.', filename=filename)


@api.route('/images/')
def images():
    data = []
    for image_path in get_image_paths(current_app.root_path, 'gif'):
        uri = '/'.join(image_path.parts[-5:])
        width, height = get_img_dimensions(f'file://{image_path}')
        entry = {'uri': uri,
                 'width': width,
                 'height': height}
        data.append(entry)
    return jsonify(data)


def json_error_response(status_code, reason, **kwargs):
    return jsonify({
        'status': status_code,
        'error': reason
    })
