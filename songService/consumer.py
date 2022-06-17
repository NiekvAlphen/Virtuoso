import pika, json

from app.models import Song
from app import db

params = pika.URLParameters('amqps://ohisbkdk:RtzvaML4ppyUkzjFWOQ6PasiCPOqZHbI@hawk.rmq.cloudamqp.com/ohisbkdk')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='song_queue')

def callback(ch, method, properties, body):
    print('Received in songService')
    #data = json.loads(body)
    #print(data)

    if properties.content_type == 'product_created':
        #song = Song(id=data['id'], title=data['title'], artist=data['artist'], audio_file=data['audio_file'], genre=data['genre'], date_created=data['date_created'], date_modified=data['date_modified'])
        #db.session.add(song)
        #db.session.commit()
        print('Song Created')

    elif properties.content_type == 'product_deleted':
        #song = Song.query.get(data)
        #db.session.delete(song)
        #db.session.commit()
        print('Song Deleted')

channel.basic_consume(queue='song_queue', on_message_callback=callback, auto_ack=True)

print('Start Consuming')

channel.start_consuming()

channel.close()