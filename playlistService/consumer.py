import pika, json

from app import models
from app import db, create_app
app = create_app('production')
app.app_context().push()

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
        # remove songid from songs_array
        print(data)
        playlists = models.Playlist.query.filter(models.Playlist.songs_array == data).all()
        for playlist in playlists:
            playlist.deletesong()
        
        print('Song Deleted')

channel.basic_consume(queue='playlist_queue', on_message_callback=callback, auto_ack=True)

print('Start Consuming')

channel.start_consuming()

channel.close()