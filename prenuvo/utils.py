import subprocess
from urllib.request import urlopen

from PIL import ImageFile


def get_gif_dimensions(uri):
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
