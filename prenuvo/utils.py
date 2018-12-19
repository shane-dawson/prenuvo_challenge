from urllib.request import urlopen

from PIL import ImageFile


def get_gif_dimensions(uri):
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
