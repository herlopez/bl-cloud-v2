# Brilliant Labs Cloud API


*  [HTTP Communication](#head_http_communication)
    *  [Overview](#head_http_overview)
    *  [Headers](#head_http_headers)
    *  [Examples](#head_http_examples)
*  [WS Communication](#head_ws_communication)
    *  [Overview](#head_ws_overview)
    *  [Examples](#head_ws_examples)
* [MQTT Communication](#head_mqtt_communication)
    *  [Overview](#head_mqtt_overview)
    *  [Examples](#head_mqtt_examples)
*  [Variables](#head_variables)
    *  [Overview](#head_overview)
    *  [Create Variable](#head_create_variable)
    *  [Delete Variable](#head_erase_variable)
    *  [Set Variable](#head_set_variable)
    *  [Get Variable](#head_get_variable)
    *  [Get All Variables](#head_get_all_variables)
*  [Charts](#head_charts)
    *  [Overview](#head_charts_overview)
    *  [Create Chart](#head_create_chart)
    *  [Delete Chart](#head_erase_chart)
    *  [Delete Chart Data](#head_erase_chart_data)
    *  [Add Chart Point](#head_add_chart_point)
    *  [Get All Charts](#head_get_all_charts)

 

## <a name="head_http_communication"></a> HTTP Communication
#### <a name="head_http_overview"></a> Overview

Communicating to the Brilliant Labs Cloud can be done through a **GET** https request, whereas the content of the body is a json string with a given command. The primary use case for communicating through https is for devices that do not have the capabilities of communicating through a websocket connection. The server only accepts connections over SSL.

**The URL for https requests: **: https://cloud.brilliantlabs.ca/api

#### <a name="head_http_headers"></a> Headers
The required headers:

| Header | Value |
| ------ | ------ |
| Content-Type | application/json |
#### <a name="head_http_examples"></a> Examples

**Command Line cURL**
```terminal
curl -d '{"cmd":"CREATE_VARIABLE", "key":"gsqfr6DsDWfGhn4og5RHNQTA3hFE","value":5, "name":"TestVariable"}' -H "Content-Type: application/json" -X GET  https://cloud.brilliantlabs.ca/api
```
response
```terminal
{"meta":{"revision":0,"created":1563162485390,"version":0},"results":{"TestVariable":5}} 
```

If you don't have cURL installed, you can check how to do so <a href="https://www.luminanetworks.com/docs-lsc-610/Topics/SDN_Controller_Software_Installation_Guide/Appendix/Installing_cURL_for_Ubuntu_1.html">here</a>

You can also use an API development tool like <a href="https://www.getpostman.com">Postman</a> or <a href="https://insomnia.rest/">Insomnia</a>

## <a name="head_ws_communication"></a> WS Communication
#### <a name="head_ws_overview"></a> Overview
Communicating to the Brilliant Labs Cloud can be done through a **Websocket Connection**, whereas the message content is a json string with a given command. The primary use case for communicating through a websocket on a device is to have improved communication speeds for real time applications. The server only accepts websocket connections over wss.

> Please note that the API described in this document also works with the websocket server. Use the same commands and format described later in the document as you would with the https requests body.

**The URL for websocket connections is: **: wss://cloud.brilliantlabs.ca/wsapi
#### <a name="head_ws_examples"></a> Examples
If you visit <a href="https://www.websocket.org/echo.html">https://www.websocket.org/echo.html</a>,  you can test out the websocket API.

The image bellow demonstrates an example using **WebSocket.org** to communicate with the server.

![alt text](https://github.com/Brilliant-Labs/cloud/blob/master/ws_exmple.png?raw=true "ws example")

## <a name="head_mqtt_communication"></a>MQTT Communication
#### <a name="head_mqtt_overview"></a> Overview
Communicating to the Brilliant Labs Cloud can be done through a **MQTT Connection**. Messages are published to a target topic whereas the message content is a json string with a given command, and the topic is the project API key. Server responses can be received by subscribing to the topic of your projects API key with the appending of '-rsp'. Publish to -> `XXXXXX_API_KEY_XXXXXX`, Subscribe to -> `XXXXXX_API_KEY_XXXXXX-rsp`. 

Currently the MQTT broker only accepts tcp connections on port **1883**.

#### <a name="head_mqtt_examples"></a> Examples
You can test the MQTT communication using a chrome application called <a href="https://chrome.google.com/webstore/detail/mqttlens/hemojaaeigabkbcookmlgmdigohjobjm?hl=en">MQTTLens.</a>

Here is an example using MQTT Lens to set the value of a variable over MQTT:

First we create the connection:

![alt text](https://github.com/Brilliant-Labs/cloud/blob/master/mqtt-example-2.png?raw=true "MQTT Example")

Second, we subscribe to the API key + '-rsp', and publish the command to the API key.

![alt text](https://github.com/Brilliant-Labs/cloud/blob/master/mqtt-example-1.png?raw=true "MQTT Example 2")

We can see that we received the confirmation that the command was successful.
## <a name="head_variables"></a> Variables
#### <a name="head_overview"></a> Overview
Variables are meant to be used to store simple values and flags to a given API key, like one would do while coding *let myVariable = 23*. Variables are not intended to be used for large data sets, however variables can hold objects and all data types. Variables must all have unique names. Variables can be created, deleted, set and read from a device using the API key. Please read carefully throughout this section to catch all the details needed while implementing this API in your application or embedded
system.
 
|Command            |Parameters|Type     |Description                           |
|-------------------|----------|---------|--------------------------------------|
|**CREATE_VARIABLE**|name      |String   |Name of the variable to create.       |
|                   |value     |Any      |Value to initialize the variable to.  |
|**DELETE_VARIABLE**|name      |String   |Name of the variable to erase.        |
|**SET_VARIABLE**   |name      |String   |Name of the variable to save.        |
|                   |value     |Any      |Value to set the variable to.         |
|**GET_VARIABLE**   |name      |String   |Name of the variable to read.         |
|**GET_ALL_VARIABLES**   |      |   ||


#### <a name="head_create_variable">Create Variable

Command that creates a variable that can be set and read.

|Command            |Parameters|Type     |Description                           |
|-------------------|----------|---------|--------------------------------------|
|**CREATE_VARIABLE**|name      |String   |Name of the variable to create.       |
|                   |value*     |Any      |Value to initialize the variable with.|

*\*Paramate 'value' is not required, will be initialized as **null** if not specified.*

##### Example 1 (No Value)
*Request:*
```json
{
  "key": "XXXXXXXXXXXXXX",
  "cmd": "CREATE_VARIABLE",
  "name": "Test"
}
```
*Response:*
```json
{
  "meta":{
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  },
  "result": {
    "Test": null
  }
}
```
##### Example 2 (Value Provided)
*Request:*
```json
{
  "key": "XXXXXXXXXXXXXX",
  "cmd": "CREATE_VARIABLE",
  "name": "Test",
  "value": 12345678
}
```
*Response:*
```json
{
  "meta":{
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  },
  "result": {
    "Test": 12345678
  }
}
```


#### <a name="head_erase_variable"> Delete Variable

Command that erases a stored variable. 

|Command            |Parameters|Type     |Description                           |
|-------------------|----------|---------|--------------------------------------|
|**DELETE_VARIABLE** |name      |String   |Name of the variable to erase.        |

##### Example

*Request:*
```json
{
  "key": "XXXXXXXXXXXXXX",
  "cmd": "DELETE_VARIABLE",
  "name": "Test"
}
```

*Response:*
```json
{
  "result": true,
   "meta": {
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  }
}
```

#### <a name="head_set_variable"> Set Variable

Command that sets the value of a variable.

|Command            |Parameters|Type    |Description                            |
|-------------------|----------|--------|---------------------------------------|
|**SET_VARIABLE**   |name      |String  |Name of the variable to set.           |
|                   |value     |Any     |Value to set the variable to.          |

##### Example
*Request:*
```json
{
  "key": "XXXXXXXXXXXXXX",
  "cmd": "SET_VARIABLE",
  "name": "Test",
  "value": 87654321
}
```
*Response:*
```json
{
  "meta": {
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  },
  "result": {
    "Test": 87654321
  }
}
```

#### <a name="head_get_variable"> Get Variable

Command that gets the value of a variable.

|Command            |Parameters|Type     |Description                           |
|-------------------|----------|---------|--------------------------------------|
|**GET_VARIABLE**   |name      |String   |Name of the variable to read.          |

##### Example
*Request*
```json
{
  "key": "XXXXXXXXXXXXXX",
  "cmd": "GET_VARIABLE", 
  "name": "Test"
}
```
*Response*
```json
{
  "meta": {
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  },
  "result": {
    "Test": 87654321
  }
}
```
#### <a name="head_get_all_variables"> Get All Variable

Command that retrieves all variables.

|Command            |Parameters|Type     |Description                           |
|-------------------|----------|---------|--------------------------------------|
|**GET_ALL_VARIABLES**   |      |   |         |

##### Example
*Request*
```json
{
  "key": "XXXXXXXXXXXXXX",
  "cmd": "GET_ALL_VARIABLES"
}
```
*Response*
```json
{
    "meta": {
        "revision": 0,
        "created": 1567996872756,
        "version": 0,
        "updated": 1569251454138
    },
    "results": {
        "Humidity": 43,
        "Temperature": 26,
        "Test Name": "Heat"
    }
}

```

## <a name="head_charts">Charts
#### <a name="head_charts_overview"> Overview

Charts are intended to be used to hold big data sets with the goal of being able to visualize the data as a chart on the Brilliant Labs Cloud web client. Chart commands can also be used to simply hold big data sets, without necessarily wanting to visualise the data on a chart. Charts can be created, delete, set and read. Please read carefully throughout this section to catch all the details needed while implementing this API in your application or embedded system. 

Five different chart types can be create:
1. **Line** 
2. **Bar**
3. **Pie**
4. **Scatter** 
5. **Histogram**

#### <a name="head_create_chart"> Create Chart
##### This command creates a **Bar**, **Pie**, **Scatter**, **Line** or **Histrogram** Chart.
|Command                   |Parameters|Type     |Description                              |
|--------------------------|----------|---------|-----------------------------------------|
|**CREATE_CHART**          |name      |String   |Name of the chart to create.             |
|                          |type      |String   |Type of chart to create. ['BAR', 'PIE', 'SCATTER', 'LINE', 'HISTOGRAM']        |
|                          |start     |Number   |Start range of the histogram chart.  (Histogram)   |
|                          |end       |Number    |End range of the histogram chart.   (Histogram)   |


##### Example 1 (Line Chart, Bar, Pie, Scatter)
*Request*
```json
{ 
  "key": "XXXXXXXXXXXXXXXX",
  "cmd": "CREATE_CHART",
  "name": "Temperature Chart",
  "type": "LINE"
}
```
*Response*
```json
{
  "result":{
    "created": 1563162485390,
    "entries": 0,
    "id": "cu2495n20cn20c",
    "name": "Temperature Chart",
    "type": "LINE"
  },
  "meta":{
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  }
}
```
##### Example 2 (Histogram)
*Request*
```json
{ 
  "key": "XXXXXXXXXXXXXXXX",
  "cmd": "CREATE_CHART",
  "id": "cu2495n20cn20c",
  "name": "Age Distribution",
  "type": "HISTOGRAM",
  "start": 0,
  "end": 120
}
```
*Response*
```json
{
  "result": {
    "id": "0cwejc09wej0rv",
    "created": 1563162485390,
    "entries": 0,
    "name": "Age Distribution",
    "type": "HISTOGRAM",
    "start": 0,
    "end": 120
  },
  "meta": {
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  }
}
```


#### <a name="head_erase_chart"> Delete Chart
##### This function erases a chart. 
|Command                    |Parameters|Type     |Description                   |
|-------------------------- |----------|---------|------------------------------|
|**DELETE_CHART**            |name      |String   |Name or ID of the chart to erase.   |

##### Example 1 (Name) 
*Request*
```json
{
  "key": "XXXXXXXXXXXXXXXX",
  "cmd": "DELETE_CHART",
  "name": "Temperature Chart"
}
```
*Response*
```json
{
  "result": true,
   "meta": {
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  }
}
```
##### Example 1 (ID) 
*Request*
```json
{
  "key": "XXXXXXXXXXXXXXXX",
  "cmd": "DELETE_CHART",
  "name": "cu2495n20cn20c",
}
```
*Response*
```json
{
  "result": true,
  "meta": {
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  }
}
```




#### <a name="head_erase_chart_data"> Delete Chart Data
##### This command erases the data associated with a chart. 
|Command                    |Parameters|Type     |Description                   |
|-------------------------- |----------|---------|------------------------------|
|**DELETE_CHART_DATA**       |name      |String   |Name or ID of the chart to erase data from.|
|                           |range     |Any      |Entry range to erase.  "ALL", "{0,100}", 5 |


##### Example 1 (Line Chart Delete 1 Entry 5 Entries)
Example Data: 
```json
{
  0: {
    "y": 34
  },
  1: {
    "y": 32
  },  
  2: {
    "y": 30
  },  
  3: {
    "y": 39
  },  
  4: {
    "y": 28
  }
}
```
*Request*
```json
{
  "key": "XXXXXXXXXXXXXXXX",
  "cmd": "DELETE_CHART_DATA",
  "name": "Temperature Chart"
  "range": 3
}
```
*Response*
```json
{
"result": {
    "id": "0cwejc09wej0rv",
    "created": 1563162485390,
    "entries": 4,
    "name": "Temperature Chart",
    "type": "Line"
  },
  "meta": {
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  }
}
```
Result Data: 
```json
{
  0: {
    "y": 34
  },
  1: {
    "y": 32
  },  
  2: {
    "y": 30
  },  
  3: {
    "y": 28
  }
}
```
##### Example 2 (Line Chart Delete All 5 Entries)
Example Data: 
```json
{
  0: {
    "y": 34
  },
  1: {
    "y": 32
  },  
  2: {
    "y": 30
  },  
  3: {
    "y": 39
  },  
  4: {
    "y": 28
  }
}
```
*Request*
```json
{
  "key":"XXXXXXXXXXXXXXXX",
  "cmd":"DELETE_CHART_DATA",
  "name": "Temperature Chart"
  "range": "all"
}
```
*Response*
```json
{
  "result": {
    "id": "0cwejc09wej0rv",
    "created": 1563162485390,
    "entries": 0,
    "name": "Tmperature Chart",
    "type": "Line"
  },
  "meta": {
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  }
}
```
RESULT DATA: 
```json
{
  
}
```
##### Example 3 Line Chart Delete Range (5 Entries)
DATA: 
```json
{
  0:{
    "y": 34
  },
  1:{
    "y": 32
  },  
  2:{
    "y": 30
  },  
  3:{
    "y": 39
  },  
  4:{
    "y": 28
  }
}
```
*Request*
```json
{
  "key": "XXXXXXXXXXXXXXXX",
  "cmd": "DELETE_CHART_DATA",
  "name": "Temperature Chart"
  "range": {
    "start": 1,
    "end": 3
  }
}
```
*Response*
```json
{
"result":{
    "id": "0cwejc09wej0rv",
    "created": 1563162485390,
    "entries": 2,
    "name": "Tmperature Chart",
    "type": "Line"
  },
  "meta":{
    "revision":0,
    "created":1563162485390,
    "version":0
  }
}
```
RESULT DATA: 
```json
{
  0:{
    "y": 34
  },
  1:{
    "y": 28
  }
}
```




#### <a name="head_add_chart_point"> Add Chart Point
##### This commands adds a data point to a chart. 
|Command                     |Parameters|Type       |Description                                      |
|----------------------------|----------|-----------|-------------------------------------------------|
|**ADD_CHART_POINT**.        |name      |String     |Name or ID of the chart to add the data point to.|
|                            |point     |String     |Name of the data point.  (Pie, Bar)        |
|                            |value     |Number     |Value of the data point. (Pie, Line, Bar)        |
|                            |x         |Number     |Value of the X coordinate.  (Scatter, Histogram) |
|                            |y         |Number     |Value of the Y coordinate.  (Scatter, Histogram) |


##### Example 1 (Pie, Bar)
DATA: 
```json
{
  0:{
    "point": "Mortgage"
    "value": 540.23
  },
  1:{
    "point": "Travel"
    "value": 250
  },  
  2:{
    "point": "Utilities"
    "value": 320.99
  }  
}
```
*Request*
```json
{
  "key":"XXXXXXXXXXXXXXXX",
  "cmd":"ADD_CHART_POINT",
  "name": "Monthly Budget Pie Chart",
  "point": "Food",
  "value": 234.23
}
```
*Response*
```json
{
"result":{
    "id": "0cwejc09wej0rv",
    "created": 1563162485390,
    "entries": 4,
    "name": "Monthly Budget Pie Chart",
    "type": "PIE"
  },
  "meta":{
    "revision":0,
    "created":1563162485390,
    "version":0
  }
}
```
RESULT DATA: 
```json
{
  0:{
    "point": "Mortgage"
    "value": 540.23
  },
  1:{
    "point": "Travel"
    "value": 250
  },  
  2:{
    "point": "Utilities"
    "value": 320.99
  },
  3:{
    "point": "Food",
    "value": 234.23
  }
}
```

##### Example 2 (Line)
DATA: 
```json
{
  0:{
    "value": 540.23
  },
  1:{
    "value": 250
  },  
  2:{
    "value": 320.99
  }  
}
```
*Request*
```json
{
  "key":"XXXXXXXXXXXXXXXX",
  "cmd":"ADD_CHART_POINT",
  "name": "Monthly Budget Pie Chart",
  "value": 234.23
}
```
*Response*
```json
{
"result":{
    "id": "0cwejc09wej0rv",
    "created": 1563162485390,
    "entries": 4,
    "name": "Stock Price",
    "type": "LINE"
  },
  "meta":{
    "revision":0,
    "created":1563162485390,
    "version":0
  }
}
```
RESULT DATA: 
```json
{
  0:{
    "value": 540.23
  },
  1:{
    "value": 250
  },  
  2:{
    "value": 320.99
  },
  3:{
    "value": 234.23
  }    
}
```

##### Example 1 (Pie, Bar)
DATA: 
```json
{
  0:{
    "point": "Mortgage"
    "value": 540.23
  },
  1:{
    "point": "Travel"
    "value": 250
  },  
  2:{
    "point": "Utilities"
    "value": 320.99
  }  
}
```
*Request*
```json
{
  "key":"XXXXXXXXXXXXXXXX",
  "cmd":"ADD_CHART_POINT",
  "name": "Monthly Budget Pie Chart",
  "point": "Food",
  "value": 234.23
}
```
*Response*
```json
{
"result":{
    "id": "0cwejc09wej0rv",
    "created": 1563162485390,
    "entries": 4,
    "name": "Monthly Budget Pie Chart",
    "type": "PIE"
  },
  "meta":{
    "revision":0,
    "created":1563162485390,
    "version":0
  }
}
```
RESULT DATA: 
```json
{
  0:{
    "point": "Mortgage"
    "value": 540.23
  },
  1:{
    "point": "Travel"
    "value": 250
  },  
  2:{
    "point": "Utilities"
    "value": 320.99
  },
  3:{
    "point": "Food",
    "value": 234.23
  }
}
```

##### Example 3 (Scatte)
DATA: 
```json
{
  0:{
    "x": 43,
    "y": -23
  },
  1:{
    "x": 32,
    "y": -22
  },  
  2:{
    "x": 43,
    "y": -33
  }  
}
```
*Request*
```json
{
  "key":"XXXXXXXXXXXXXXXX",
  "cmd":"ADD_CHART_POINT",
  "name": "Humidity in function of temperature chart",
  "x": 34.23,
}
```
*Response*
```json
{
"result":{
    "id": "0cwejc09wej0rv",
    "created": 1563162485390,
    "entries": 4,
    "name": "Stock Price",
    "type": "LINE"
  },
  "meta":{
    "revision":0,
    "created":1563162485390,
    "version":0
  }
}
```
RESULT DATA: 
```json
{
  0:{
    "value": 540.23
  },
  1:{
    "value": 250
  },  
  2:{
    "value": 320.99
  },
  3:{
    "value": 234.23
  }    
}
```












Command that erases a stored variable. 

|Command            |Parameters|Type     |Description                           |
|-------------------|----------|---------|--------------------------------------|
|**DELETE_VARIABLE** |name      |String   |Name of the variable to erase.        |

##### Example

*Request:*
```json
{
  "key": "XXXXXXXXXXXXXX",
  "cmd": "DELETE_VARIABLE",
  "name": "Test"
}
```

*Response:*
```json
{
  "result": true,
   "meta": {
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  }
}
```

#### <a name="head_set_variable"> Set Variable

Command that sets the value of a variable.

|Command            |Parameters|Type    |Description                            |
|-------------------|----------|--------|---------------------------------------|
|**SET_VARIABLE**   |name      |String  |Name of the variable to set.           |
|                   |value     |Any     |Value to set the variable to.          |

##### Example
*Request:*
```json
{
  "key": "XXXXXXXXXXXXXX",
  "cmd": "SET_VARIABLE",
  "name": "Test",
  "value": 87654321
}
```
*Response:*
```json
{
  "meta": {
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  },
  "result": {
    "Test": 87654321
  }
}
```

#### <a name="head_get_variable"> Get Variable

Command that gets the value of a variable.

|Command            |Parameters|Type     |Description                           |
|-------------------|----------|---------|--------------------------------------|
|**GET_VARIABLE**   |name      |String   |Name of the variable to read.          |

##### Example
*Request*
```json
{
  "key": "XXXXXXXXXXXXXX",
  "cmd": "GET_VARIABLE", 
  "name": "Test"
}
```
*Response*
```json
{
  "meta": {
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  },
  "result": {
    "Test": 87654321
  }
}
```


## <a name="head_charts">Charts
#### <a name="head_charts_overview"> Overview
#### <a name="head_create_chart"> Create Chart
##### This command creates a **Bar**, **Pie**, **Scatter**, **Line** or **Histrogram** Chart.
|Command                   |Parameters|Type     |Description                              |
|--------------------------|----------|---------|-----------------------------------------|
|**CREATE_CHART**          |name      |String   |Name of the chart to create.             |
|                          |type      |String   |Type of chart to create. ['BAR', 'PIE', 'SCATTER', 'LINE', 'HISTOGRAM']        |
|                          |start     |Number   |Start range of the histogram chart.  (Histogram)   |
|                          |end      |Number   |Stop range of the histogram chart.   (Histogram)   |


##### Example 1 (Line Chart, Bar, Pie, Scatter)
*Request*
```json
{ 
  "key": "XXXXXXXXXXXXXXXX",
  "cmd": "CREATE_CHART",
  "name": "Temperature Chart",
  "type": "LINE"
}
```
*Response*
```json
{
  "result":{
    "created": 1563162485390,
    "entries": 0,
    "id": "cu2495n20cn20c",
    "name": "Temperature Chart",
    "type": "LINE"
  },
  "meta":{
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  }
}
```
##### Example 2 (Histogram)
*Request*
```json
{ 
  "key": "XXXXXXXXXXXXXXXX",
  "cmd": "CREATE_CHART",
  "name": "Age Distribution",
  "type": "HISTOGRAM",
  "start": 0,
  "end": 120
}
```
*Response*
```json
{
  "result": {
    "id": "0cwejc09wej0rv",
    "created": 1563162485390,
    "entries": 0,
    "name": "Age Distribution",
    "type": "HISTOGRAM",
    "start": 0,
    "end": 120
  },
  "meta": {
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  }
}
```


#### <a name="head_erase_chart"> Delete Chart
##### This function erases a chart. 
|Command                    |Parameters|Type     |Description                   |
|-------------------------- |----------|---------|------------------------------|
|**DELETE_CHART**            |name      |String   |Name or ID of the chart to erase.   |

##### Example 1 (Name) 
*Request*
```json
{
  "key": "XXXXXXXXXXXXXXXX",
  "cmd": "DELETE_CHART",
  "name": "Temperature Chart"
}
```
*Response*
```json
{
  "result": true,
   "meta": {
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  }
}
```
##### Example 1 (ID) 
*Request*
```json
{
  "key": "XXXXXXXXXXXXXXXX",
  "cmd": "DELETE_CHART",
  "name": "cu2495n20cn20c",
}
```
*Response*
```json
{
  "result": true,
  "meta": {
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  }
}
```




#### <a name="head_erase_chart_data"> Delete Chart Data
##### This command erases the data associated with a chart. 
|Command                    |Parameters|Type     |Description                   |
|-------------------------- |----------|---------|------------------------------|
|**DELETE_CHART_DATA**       |name      |String   |Name or ID of the chart to erase data from.|
|                           |range     |Any      |Entry range to erase.  "ALL", "{0,100}", 5 |


##### Example 1 (Line Chart Delete 1 Entry 5 Entries)
Example Data: 
```json
{
  0: {
    "y": 34
  },
  1: {
    "y": 32
  },  
  2: {
    "y": 30
  },  
  3: {
    "y": 39
  },  
  4: {
    "y": 28
  }
}
```
*Request*
```json
{
  "key": "XXXXXXXXXXXXXXXX",
  "cmd": "DELETE_CHART_DATA",
  "name": "Temperature Chart"
  "range": 3
}
```
*Response*
```json
{
"result": {
    "id": "0cwejc09wej0rv",
    "created": 1563162485390,
    "entries": 4,
    "name": "Temperature Chart",
    "type": "Line"
  },
  "meta": {
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  }
}
```
Result Data: 
```json
{
  0: {
    "y": 34
  },
  1: {
    "y": 32
  },  
  2: {
    "y": 30
  },  
  3: {
    "y": 28
  }
}
```
##### Example 2 (Line Chart Delete All 5 Entries)
Example Data: 
```json
{
  0: {
    "y": 34
  },
  1: {
    "y": 32
  },  
  2: {
    "y": 30
  },  
  3: {
    "y": 39
  },  
  4: {
    "y": 28
  }
}
```
*Request*
```json
{
  "key":"XXXXXXXXXXXXXXXX",
  "cmd":"DELETE_CHART_DATA",
  "name": "Temperature Chart"
  "range": "all"
}
```
*Response*
```json
{
  "result": {
    "id": "0cwejc09wej0rv",
    "created": 1563162485390,
    "entries": 0,
    "name": "Tmperature Chart",
    "type": "Line"
  },
  "meta": {
    "revision": 0,
    "created": 1563162485390,
    "version": 0
  }
}
```
RESULT DATA: 
```json
{
  
}
```
##### Example 3 Line Chart Delete Range (5 Entries)
DATA: 
```json
{
  0:{
    "y": 34
  },
  1:{
    "y": 32
  },  
  2:{
    "y": 30
  },  
  3:{
    "y": 39
  },  
  4:{
    "y": 28
  }
}
```
*Request*
```json
{
  "key": "XXXXXXXXXXXXXXXX",
  "cmd": "DELETE_CHART_DATA",
  "name": "Temperature Chart"
  "range": {
    "start": 1,
    "end": 3
  }
}
```
*Response*
```json
{
"result":{
    "id": "0cwejc09wej0rv",
    "created": 1563162485390,
    "entries": 2,
    "name": "Tmperature Chart",
    "type": "Line"
  },
  "meta":{
    "revision":0,
    "created":1563162485390,
    "version":0
  }
}
```
RESULT DATA: 
```json
{
  0:{
    "y": 34
  },
  1:{
    "y": 28
  }
}
```




#### <a name="head_add_chart_point"> Add Chart Point
##### This commands adds a data point to a chart. 
|Command                     |Parameters|Type       |Description                                      |
|----------------------------|----------|-----------|-------------------------------------------------|
|**ADD_CHART_POINT**.        |name      |String     |Name or ID of the chart to add the data point to.|
|                            |point     |String     |Name of the data point.  (Pie, Bar)        |
|                            |value     |Number     |Value of the data point. (Pie, Line, Bar)        |
|                            |x         |Number     |Value of the X coordinate.  (Scatter, Histogram) |
|                            |y         |Number     |Value of the Y coordinate.  (Scatter, Histogram) |


##### Example 1 (Pie, Bar)
DATA: 
```json
{
  0:{
    "point": "Mortgage"
    "value": 540.23
  },
  1:{
    "point": "Travel"
    "value": 250
  },  
  2:{
    "point": "Utilities"
    "value": 320.99
  }  
}
```
*Request*
```json
{
  "key":"XXXXXXXXXXXXXXXX",
  "cmd":"ADD_CHART_POINT",
  "name": "Monthly Budget Pie Chart",
  "point": "Food",
  "value": 234.23
}
```
*Response*
```json
{
"result":{
    "id": "0cwejc09wej0rv",
    "created": 1563162485390,
    "entries": 4,
    "name": "Monthly Budget Pie Chart",
    "type": "PIE"
  },
  "meta":{
    "revision":0,
    "created":1563162485390,
    "version":0
  }
}
```
RESULT DATA: 
```json
{
  0:{
    "point": "Mortgage"
    "value": 540.23
  },
  1:{
    "point": "Travel"
    "value": 250
  },  
  2:{
    "point": "Utilities"
    "value": 320.99
  },
  3:{
    "point": "Food",
    "value": 234.23
  }
}
```

##### Example 2 (Line)
DATA: 
```json
{
  0:{
    "value": 540.23
  },
  1:{
    "value": 250
  },  
  2:{
    "value": 320.99
  }  
}
```
*Request*
```json
{
  "key":"XXXXXXXXXXXXXXXX",
  "cmd":"ADD_CHART_POINT",
  "name": "Monthly Budget Pie Chart",
  "value": 234.23
}
```
*Response*
```json
{
"result":{
    "id": "0cwejc09wej0rv",
    "created": 1563162485390,
    "entries": 4,
    "name": "Stock Price",
    "type": "LINE"
  },
  "meta":{
    "revision":0,
    "created":1563162485390,
    "version":0
  }
}
```
RESULT DATA: 
```json
{
  0:{
    "value": 540.23
  },
  1:{
    "value": 250
  },  
  2:{
    "value": 320.99
  },
  3:{
    "value": 234.23
  }    
}
```

##### Example 1 (Pie, Bar)
DATA: 
```json
{
  0:{
    "point": "Mortgage"
    "value": 540.23
  },
  1:{
    "point": "Travel"
    "value": 250
  },  
  2:{
    "point": "Utilities"
    "value": 320.99
  }  
}
```
*Request*
```json
{
  "key":"XXXXXXXXXXXXXXXX",
  "cmd":"ADD_CHART_POINT",
  "name": "Monthly Budget Pie Chart",
  "point": "Food",
  "value": 234.23
}
```
*Response*
```json
{
"result":{
    "id": "0cwejc09wej0rv",
    "created": 1563162485390,
    "entries": 4,
    "name": "Monthly Budget Pie Chart",
    "type": "PIE"
  },
  "meta":{
    "revision":0,
    "created":1563162485390,
    "version":0
  }
}
```
RESULT DATA: 
```json
{
  0:{
    "point": "Mortgage"
    "value": 540.23
  },
  1:{
    "point": "Travel"
    "value": 250
  },  
  2:{
    "point": "Utilities"
    "value": 320.99
  },
  3:{
    "point": "Food",
    "value": 234.23
  }
}
```

##### Example 3 (Scatte)
DATA: 
```json
{
  0:{
    "x": 43,
    "y": -23
  },
  1:{
    "x": 32,
    "y": -22
  },  
  2:{
    "x": 43,
    "y": -33
  }  
}
```
*Request*
```json
{
  "key":"XXXXXXXXXXXXXXXX",
  "cmd":"ADD_CHART_POINT",
  "name": "Humidity in function of temperature chart",
  "x": 34.23,
}
```
*Response*
```json
{
"result":{
    "id": "0cwejc09wej0rv",
    "created": 1563162485390,
    "entries": 4,
    "name": "Stock Price",
    "type": "LINE"
  },
  "meta":{
    "revision":0,
    "created":1563162485390,
    "version":0
  }
}
```
RESULT DATA: 
```json
{
  0:{
    "value": 540.23
  },
  1:{
    "value": 250
  },  
  2:{
    "value": 320.99
  },
  3:{
    "value": 234.23
  }    
}
```

#### <a name="head_get_all_charts> Get All Charts

Command that retrieves all chaarts.

|Command            |Parameters|Type     |Description                           |
|-------------------|----------|---------|--------------------------------------|
|**GET_ALL_CHARTS**   |      |   |         |

##### Example
*Request*
```json
{
  "key": "XXXXXXXXXXXXXX",
  "cmd": "GET_ALL_CHARTS"
}
```
*Response*
```json
{
    "meta": {
        "revision": 0,
        "created": 1567996872756,
        "version": 0,
        "updated": 1569251454138
    },
     "results": [
            {
                "name": "Temperature Logging",
                "type": "LINE",
                "entries": 23
            },
            {
                "name": "Budget",
                "type": "PIE",
                "entries": 12
            },
            {
                "name": "Age Spread",
                "type": "HISTO",
                "entries": 44
            },
            {
                "name": "Test Results",
                "type": "SCATTER",
                "entries": 123
            }
    ]
}

```









