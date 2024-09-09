*POS Application*

This project is a fully-featured Point of Sale (POS) Application with a comprehensive admin panel and customer-facing functionalities. The application includes features like product management, a shopping cart, order processing, client management, and revenue tracking. The website is fully secured with JWT-based authentication, and all sensitive data is stored securely using bcrypt.

The project is deployed and available online at: https://my-poss-application-client.onrender.com/

*Features*

  - Admin Panel: Manage categories and products, view orders and customers, and track total revenue and client statistics.
  - Shopping Cart: Add products to the cart, view total and tax calculation, and proceed to checkout.
  - Order Management: Admin can view client orders, track product purchases, and calculate total earnings per client.
  - Product Search and Filtering: Search for products by category, with filter options for easy navigation.
  - Statistics Dashboard: Admin can view statistics such as total products, total customers (those who made purchases), and overall revenue.
  - Authentication: User registration and login functionality, with all endpoints protected. Only authenticated users can access the site.
  - Security: Implemented using bcrypt for password encryption and JWT for secure authentication.

*Technologies Used*

  - Frontend
    - React/Redux
    - Tailwind CSS
    - Ant Design
  - Backend
    - Node.js/Express.js
    - MongoDB

*Installation and Setup*

Follow these steps to set up the project locally:

  - Prerequisites
    - Node.js installed on your machine.
    - MongoDB setup
   
  - Backend Setup
    - Clone the repository:
      
           git clone https://github.com/sadiqnvv/POSS-APP.git
           cd pos-application/backend
    - Install dependencies:

            npm install
    - Create a .env file in the backend folder and add the following:
      
          MONGO_URI = "mongodb+srv://<username>:<password>@cluster0.ur7x7.mongodb.net/pos-app"
          JWT_SECRET_KEY = "random_secret_key"
          JWT_REFRESH_SECRET_KEY = "random_refresh_key"
    - Start the backend server:

          npm run dev

 - Frontend Setup
    - Install dependencies:

          npm install
    - Create a .env file in the frontend folder and add the following:

          REACT_APP_SERVER_URL = http://localhost:5000
    - Start the frontend server:

          npm start

*Running the Project*

After completing the above steps, you can access the project in your browser at http://localhost:3000.

The backend server will be running at http://localhost:5000, and all requests from the frontend will be proxied to this server.


*Screenshots*

![image](https://github.com/user-attachments/assets/2f2726c1-2414-4412-a3e2-06510eae366f)
![image](https://github.com/user-attachments/assets/bc58680d-7e56-438d-b279-1011d5142816)
![image](https://github.com/user-attachments/assets/7e779da2-2f28-4003-8c48-f81a09797715)
![image](https://github.com/user-attachments/assets/87d25060-8f34-401a-a668-83fcdc2a866c)
![image](https://github.com/user-attachments/assets/26ec1e09-f816-4de8-85d1-55371b184c42)
![image](https://github.com/user-attachments/assets/4116a5fb-079b-4441-b0ba-c7b01ac1bc3d)
![image](https://github.com/user-attachments/assets/f98c001c-d7f5-44de-b4fb-18c445ba7d91)

*Online Version*

You can also check out the live version of the site at: https://my-poss-application-client.onrender.com/

License

This project is licensed under the Apache 2.0 License.
-------------------------------------------------------------------------------------------------------------------------------------------------
*Приложение POS*

Этот проект представляет собой полнофункциональное приложение для точки продаж (POS) с расширенной админ-панелью и функциональностью для клиентов. В приложение включены такие функции, как управление товарами, корзина покупок, обработка заказов, управление клиентами и отслеживание доходов. Сайт полностью защищен с помощью аутентификации на основе JWT, и все чувствительные данные хранятся надежно с использованием bcrypt.

Проект развернут и доступен онлайн: https://my-poss-application-client.onrender.com/

*Функции*

- Админ-панель: Управление категориями и товарами, просмотр заказов и клиентов, отслеживание общей выручки и статистики клиентов.
- Корзина: Добавление товаров в корзину, расчет общей суммы и налогов, переход к оформлению заказа.
- Управление заказами: Админ может просматривать заказы клиентов, отслеживать покупки товаров и рассчитывать общую прибыль от каждого клиента.
- Поиск и фильтрация товаров: Поиск товаров по категориям с возможностью фильтрации для удобной навигации.
- Статистика: Админ может просматривать статистику, такую как общее количество товаров, количество клиентов (которые совершили покупки) и общую выручку.
- Аутентификация: Функционал регистрации и входа в систему, при этом все эндпоинты защищены. Доступ к сайту получают только авторизованные пользователи.
- Безопасность: Используется bcrypt для шифрования паролей и JWT для безопасной аутентификации.

*Используемые технологии*
  - Фронтенд
    - React/Redux
    - Tailwind CSS
    - Ant Design
  - Бэкенд
    - Node.js/Express.js
    - MongoDB

*Установка и настройка*

Выполните следующие шаги для настройки проекта локально:

*Предварительные требования*
  - Установленный Node.js.
  - Настроенная MongoDB

*Настройка бэкенда*
  - Клонируйте репозиторий:

        git clone https://github.com/sadiqnvv/POSS-APP.git
        cd pos-application/backend
  - Установите зависимости:

        npm install
  - Создайте файл .env в папке backend и добавьте следующие строки:

        MONGO_URI = "mongodb+srv://<username>:<password>@cluster0.ur7x7.mongodb.net/pos-app"
        JWT_SECRET_KEY = "random_secret_key"
        JWT_REFRESH_SECRET_KEY = "random_refresh_key"
 - Запустите сервер бэкенда:

        npm run dev
*Настройка фронтенда*
  - Установите зависимости:

        npm install
 - Создайте файл .env в папке frontend и добавьте следующие строки:

       REACT_APP_SERVER_URL = http://localhost:5000
- Запустите сервер фронтенда:

       npm start
  
*Запуск проекта*

После выполнения всех вышеуказанных шагов вы можете получить доступ к проекту в браузере по адресу http://localhost:3000.

Сервер бэкенда будет работать по адресу http://localhost:5000, и все запросы с фронтенда будут направляться на этот сервер.

*Скриншоты*

*Онлайн версия*

![image](https://github.com/user-attachments/assets/2f2726c1-2414-4412-a3e2-06510eae366f)
![image](https://github.com/user-attachments/assets/bc58680d-7e56-438d-b279-1011d5142816)
![image](https://github.com/user-attachments/assets/7e779da2-2f28-4003-8c48-f81a09797715)
![image](https://github.com/user-attachments/assets/87d25060-8f34-401a-a668-83fcdc2a866c)
![image](https://github.com/user-attachments/assets/26ec1e09-f816-4de8-85d1-55371b184c42)
![image](https://github.com/user-attachments/assets/4116a5fb-079b-4441-b0ba-c7b01ac1bc3d)
![image](https://github.com/user-attachments/assets/f98c001c-d7f5-44de-b4fb-18c445ba7d91)

Вы также можете ознакомиться с развернутой версией сайта по ссылке: https://my-poss-application-client.onrender.com/

Лицензия

Этот проект лицензирован на условиях лицензии Apache 2.0.
