import pika, json

params = pika.URLParameters('amqps://ohisbkdk:RtzvaML4ppyUkzjFWOQ6PasiCPOqZHbI@hawk.rmq.cloudamqp.com/ohisbkdk')

connection = pika.BlockingConnection(params)

channel = connection.channel()

def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(exchange='', routing_key='playlistService', body=json.dumps(body), properties=properties)