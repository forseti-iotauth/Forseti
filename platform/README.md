# A demon about how Forseti is compatible with IoT platforms


## Philips 
A Philips Hue-based IoT platform solution, describing how Forseti is compatible with the platform. 

All functions are integrated in `main.js`, and you can see the demonstration by running the program.

```shell
node main.js
```



## OAuth
A solution on how to combine Forseti with OAuth to achieve cross-platform security, based on the API provided by Philips Hue.

To run the code, you need to first start the authorizer platform and the authorizee platform

```shell
# In Authorizee
npx http-server -p 3000 --cors

# In Authorizer
npx nodemon server.js
```

Then enter the following address in the browser to access the authorizee platform
```
http://localhost:3000
```

Cross-platform authorization and device control can be achieved according to the instructions in the browser