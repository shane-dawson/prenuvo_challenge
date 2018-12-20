import logging
import subprocess
from pathlib import Path
from urllib.request import urlopen

from PIL import ImageFile

logger = logging.getLogger(__name__)


def get_img_dimensions(uri):
    """ Read the file in chunks until pillow has enough header info to extract the dimensions"""
    with urlopen(uri) as file:
        parser = ImageFile.Parser()
        while True:
            data = file.read(1024)
            if not data:
                break
            parser.feed(data)
            if parser.image:
                return parser.image.size
        return [1, 1]


def convert_gif_webp(path):
    cmd = f'ffmpeg -i {path}/bw-gif.gif -movflags faststart -loop 0 -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" {path}/bw-gif.webp'
    p = subprocess.Popen(cmd, shell=True)
    p.communicate()


def get_image_paths(root, file_type='gif'):
    paths = []
    root_path = Path(f'{root}/static/image/862625ef').resolve()
    directories = [p for p in root_path.iterdir() if p.is_dir()]
    for _dir in directories:
        image_path = _dir / f'bw-gif.{file_type}'
        if not image_path.exists():
            logger.warning(f'No image found at {image_path}')
            continue
        paths.append(image_path)
    return paths
