# fastify-jwt
 sparkoSol assessment
# Introduction to project
 A JWT authentication web application that authenticates the users and take an argument input of city and country to show the temperature and other details of the specified city
 # Technologies
  As mentioned in the assessment mails .  A FASTAPI(fastify) server is used to handle backend operations. 
  fastify-jwt to handle authentication of users
  bcrypt to hash and compare passwords
  mongoose to store data in mongoDB Compass
  cookie-parser to read cookies ,in my case the jwt token in stored in cookie in client side
  axios to make requests from client to server with credentials
  cors to handle cors errors as we are communication on two different hosts alos setting cookies from differnt hosts
  swagger to make documentation of API's
  MDBootstrap for react jsx designing
  dotenv to store clitical keys in variables
  fastify to create fast API
  react-toastify to show friendly errors to users

  No use of statemanagment tools instaed i made a custom hook called useLocalstorage to set and setch data from localstorage if needed
  swagger API docs => http://localhost:5000/docs   
  Dont forget to replace your mongodb connection string to get started
