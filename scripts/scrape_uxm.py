import json, os, re

from bs4 import BeautifulSoup
import requests

PACK='UXM'

def get_soup(url):
    r = requests.get(url)
    return BeautifulSoup(r.text, 'html.parser')


def init():
    if not os.path.exists('./img'):
        os.mkdir('img')


def fetch_card_jpg(url, name):
    # ensure we get the full res
    url = re.sub('/scale-to-width-down/[0-9]*', '', url)
    r = requests.get(url)
    with open('./img/' + PACK + name + '.jpg', 'wb') as f:
        f.write(r.content)


def fetch_index():
    DOMAIN='https://cardguide.fandom.com'
    soup = get_soup(DOMAIN+'/wiki/Uncanny_X-Men_(expansion)')
    
    list_hdr = soup.find(id='Card_List')
    table = list_hdr.find_next('table')

    cards = []
    for row in table('tr'):
        cols = row('td')
        if len(cols) == 0:
            continue

        id = cols[0].text.strip()
        link = cols[1].find('a')
        cards.append(dict(id=id, title=link.text, url=DOMAIN+link.attrs['href']))

    return cards


def fetch_card_back(cards):
    soup = get_soup(cards[0]['url'])
    thumb_img = soup.find('img', alt='DiceMasters.jpg')
    url = thumb_img.attrs['src']
    fetch_card_jpg(url, 'back')

def fetch_card_fronts(cards):
    for card in cards:
        soup = get_soup(card['url'])
        content = soup.find(id='content')
        images = content('a', 'image')
        link = images[1]
        url = link.attrs['href']
        fetch_card_jpg(url, card['id'])

def refetch_card_fronts(cards):
    for card in cards:
        if os.path.exists('img/' + PACK + card['id'] + '.jpg'):
            continue
        soup = get_soup(card['url'])
        content = soup.find(id='content')
        images = content('a', 'image')
        link = images[1]
        url = link.attrs['href']
        fetch_card_jpg(url, card['id'])

def write_deck_json(cards):    
    deck = dict(pack=PACK, cards=cards)
    with open(PACK+'.json', 'wt') as f:
        json.dump(deck, f)
        
init()

cards = fetch_index()
fetch_card_back(cards)
#fetch_card_fronts(cards)
refetch_card_fronts(cards)
write_deck_json(cards)
