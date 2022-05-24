import pika

params = pika.URLParameters('amqps://ohisbkdk:RtzvaML4ppyUkzjFWOQ6PasiCPOqZHbI@hawk.rmq.cloudamqp.com/ohisbkdk')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='songService')

def callback(ch, method, properties, body):
    print('Received in songService')
    print(body)

channel.basic_consume(queue='songService', on_message_callback=callback)

print('Start Consuming')

channel.start_consuming()

channel.close()