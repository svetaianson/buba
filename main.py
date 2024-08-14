import telebot
import config
import requests

def go_friend(name, user):
    url = "https://1t1y2.ru:3000/f"
    payload = {
        'name': name,
        'username': user
    }
    headers = {
        'Content-Type': 'application/json'
    }
    print("Payload being sent:", payload)  # Логирование данных перед отправкой
    response = requests.post(url, json=payload, headers=headers)
    print("Response status code:", response.status_code)
    print("Response content:", response.text)


bot = telebot.TeleBot(config.TOKEN)

@bot.message_handler(commands=["start"])
def start_command_handler(msg):
    user_id = msg.from_user.id
    referrer = None

    # Проверяем наличие хоть какой-то дополнительной информации из ссылки
    if " " in msg.text:
        referrer_candidate = msg.text.split()[1]
        print(referrer_candidate, user_id)
        go_friend(user_id,referrer_candidate)

if __name__ == '__main__':
    bot.polling(none_stop=True)
