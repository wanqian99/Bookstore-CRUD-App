# Bookstore-CRUD-App
Uol Databases and Advanced Data Techniques CM3010 Midterm

This is a social networking application created with Python and Django, that allows user creation, authentication, adding of friends and real-time chat.
My sns app is called UBook, an app that allows users to socialize and keep their friends updated. It is a responsive site whereby the navigation bar and 
the contents resize according to the device’s size. The styling of the application is done with bootstrap4, with the addition of my own custom styles as 
well. A detailed explanation can be found at "report/AWD_Final_Report.pdf".

### How to run the application:
1) Navigate to virtual environment: cd snsApp_venv/bin
2) Activate virtual environment: source activate
3) Navigate to source code: cd SNS_Project
4) Make migrations: python3 manage.py makemigrations
5) Migrate: python3 manage.py migrate
6) Run server: python3 manage.py runserver
7) Base url to access UBook: http://127.0.0.1:8000/
