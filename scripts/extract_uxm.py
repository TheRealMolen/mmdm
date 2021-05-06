import glob, os, random

from PIL import Image, ImageEnhance, ImageFilter


def get_source_front_images():
    return glob.glob('img/UXM[0-9]*.jpg')


def extract_image(imagefilename, mask):
    img = Image.open(imagefilename)

    #img.filter(ImageFilter.SMOOTH).show()
    img = img.filter(ImageFilter.UnsharpMask(percent=110, threshold=5))
    
    img = ImageEnhance.Contrast(img).enhance(1.1)

    if mask.size[0] != img.size[0]:
        mask = mask.resize(img.size, resample=Image.BICUBIC)

    alpha = mask.getchannel('A')
    img.putalpha(alpha)

    outname = imagefilename.replace('.jpg', '.png')
    print('extract', imagefilename,'->', outname)
    img.save(outname)


card_mask = Image.open(os.path.join(os.path.dirname(__file__), 'card-mask.png'))

images = get_source_front_images()
#images = [random.choice(images)]

for image in images:
    extract_image(image, card_mask)