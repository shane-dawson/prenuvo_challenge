import logging
from pathlib import Path

from flask import jsonify, Blueprint, send_from_directory

from prenuvo.forms import symptom_form
from prenuvo.utils import get_gif_dimensions

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
    root_path = Path('prenuvo/static/image/862625ef').resolve()
    directories = [p for p in root_path.iterdir() if p.is_dir()]
    for _dir in directories:
        image_path = _dir / 'bw-gif.gif'
        if not image_path.exists():
            logger.warning(f'No gif found in {image_path}')
            continue
        uri = '/'.join(image_path.parts[6:])
        width, height = get_gif_dimensions(f'file://{image_path}')
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
