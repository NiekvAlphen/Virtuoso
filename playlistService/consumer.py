import pika, json

from app.models import Playlist
from app import db

params = pika.URLParameters('amqps://ohisbkdk:RtzvaML4ppyUkzjFWOQ6PasiCPOqZHbI@hawk.rmq.cloudamqp.com/ohisbkdk')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='playlist_queue')

def callback(ch, method, properties, body):
    print('Received in playlistService')
    data = json.loads(body)
    print(data)

    if properties.content_type == 'product_created':
        print('Song Created')

    elif properties.content_type == 'product_deleted':
        print('Song Deleted')

channel.basic_consume(queue='playlist_queue', on_message_callback=callback, auto_ack=True)

print('Start Consuming')

channel.start_consuming()

channel.close()