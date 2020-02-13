# Dev Setup
This project requires node and npm.  If you don't already have it installed then please visit: https://nodejs.org/en/ and download your recommended setup. 

If you don't already have nodemon or gulp installed then 'npm -g install nodemon' and/or 'npm -g install gulp' is required.

Step 1: In your terminal of choice using the CLI -> git clone https://github.com/Brilliant-Labs/bl-cloud-v2.git

Step 2: cd into your bl-cloud-v2 directory

Step 3: npm i (this is a shortcut for npm install)

Step 4: gulp

Step 5: In a new terminal: nodemon index.js

Step 6: In your browser: http://localhost:3000/

-------------------------------------

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
    *  [Add Data Point](#head_add_data_point)
    *  [Get Data Point](#head_get_data_point)
    *  [Get Chart Data](#head_get_chart_data)
    *  [Get Chart List](#head_get_all_charts)

 

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

##### Command that creates a variable that can be set and read.

Command: **CREATE_VARIABLE** 

|Parameters  |Type       |Description               |
|------------|-----------|--------------------------|
|key         |string     |Project API Key           |
|cmd         |string     |Command            |
|value*     |Any      |Value to initialize the variable with.|


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

##### Command that erases a stored variable. 

Command: **DELETE_VARIABLE** 

|Parameters  |Type       |Description               |
|------------|-----------|--------------------------|
|key         |string     |Project API Key           |
|cmd         |string     |Command            |
|name      |String   |Name of the variable to erase.        |

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

##### Command that sets the value of a variable.

Command: **SET_VARIABLE** 

|Parameters  |Type       |Description               |
|------------|-----------|--------------------------|
|key         |string     |Project API Key           |
|cmd         |string     |Command            |
|value     |Any     |Value to set the variable to.          |

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

##### Command that gets the value of a variable.

Command: **GET_VARIABLE** 

|Parameters  |Type       |Description               |
|------------|-----------|--------------------------|
|key         |string     |Project API Key           |
|cmd         |string     |Command            |
|value     |any     |Name of the variable to read.          |

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

Command: **GET_ALL_VARIABLES** 

|Parameters  |Type       |Description               |
|------------|-----------|--------------------------|
|key         |string     |Project API Key           |
|cmd         |string     |Command            |

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

Command: **CREATE_CHART** || **NEW_CHART** 

|Parameters  |Type       |Description               |
|------------|-----------|--------------------------|
|key         |string     |Project API Key           |
|cmd         |string     |Command            |
|name        |string     |Name of the chart to add data to.  |
|type        |string   |Type of chart to create. ['BAR', 'PIE', 'SCATTER', 'LINE', 'HISTOGRAM']        |
|start       |number   |Start range of the histogram chart.  (Histogram)   |
|end         |number   |Stop range of the histogram chart.   (Histogram)   |


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
    }
}
```


#### <a name="head_erase_chart"> Delete Chart
##### This function erases a chart. 

Command: **DELETE_CHART** || **ERASE_CHART** || **REMOVE_CHART** 

|Parameters  |Type       |Description               |
|------------|-----------|--------------------------|
|key         |string     |Project API Key           |
|cmd         |string     |Command            |
|name        |string     |Name of the chart to add data to.  |


##### Example 
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


#### <a name="head_erase_chart_data"> Delete Chart Data
##### This command erases the data associated with a chart. 

Command: **DELETE_CHART_POINT** || **DELETE_DATA_POINT** || **DELETE_DATA** 

|Parameters  |Type      |Description               |
|------------|----------|--------------------------|
|key         |string    |Project API Key           |
|cmd         |string    |Command            |
|name        |string    |Name of the chart to get data from.  |
|index       |number    |Index of the Data Point to delete. **Do not include this parameter if you want to retrieve the latest data point**|
|range       |object    |Range [start, end], inclusive to delete.|
|last        |number    |Delete the last X amount of values| 
|first       |number    |Delete the first X amount of values| 
|all         |bool    |true ->  delete all data| 


##### Example 1 (Line Chart Delete 1 Entry 5 Entries)
INITIAL DATA: 
```json
[
    {
        "y": 34
    },
    {
        "y": 32
    },  
    {
        "y": 30
    },  
    {
        "y": 39
    },  
    {
        "y": 28
    }
]
```
*Request*
```json
{
  "key": "XXXXXXXXXXXXXXXX",
  "cmd": "DELETE_DATA_POINT",
  "name": "Temperature Chart",
  "index": 3
}
```
*Response*
```json
{
    "result": true
}
```
RESULTING DATA: 
```json
[
    {
        "y": 34
    },
    {
        "y": 32
    },  
    {
        "y": 39
    },  
    {
        "y": 28
    }
]
```


##### Example 2 (Line Chart Delete All 5 Entries)
INITIAL DATA: 
```json
[
    {
        "y": 34
    },
    {
        "y": 32
    },  
    {
        "y": 30
    },  
    {
        "y": 39
    },  
    {
        "y": 28
    }
]
```
*Request*
```json
{
    "key":"XXXXXXXXXXXXXXXX",
    "cmd":"DELETE_DATA_POINT",
    "name": "Temperature Chart",
    "all": true
}
```
*Response*
```json
{
    "result": true
}
```
RESULTING DATA: 
```json
[
  
]
```



##### Example 3 Line Chart Delete Range (5 Entries)
INITIAL DATA: 
```json
[
    {
        "y": 34
    },
    {
        "y": 32
    },  
    {
        "y": 30
    },  
    {
        "y": 39
    },  
    {
        "y": 28
    }
]
```
*Request*
```json
{
    "key": "XXXXXXXXXXXXXXXX",
    "cmd": "DELETE_CHART_DATA",
    "name": "Temperature Chart",
    "range": [1,3]
}
```
*Response*
```json
{
    "result": true
}
```
RESULTING DATA: 
```json
[
    {
        "y": 39
    },
    {
        "y": 28
    }
]
```

##### Example 4 Line Chart Delete Last 3 (5 Entries)
INITIAL DATA: 
```json
[
    {
        "y": 34
    },
    {
        "y": 32
    },  
    {
        "y": 30
    },  
    {
        "y": 39
    },  
    {
        "y": 28
    }
]
```
*Request*
```json
{
    "key": "XXXXXXXXXXXXXXXX",
    "cmd": "DELETE_CHART_DATA",
    "name": "Temperature Chart",
    "last": 3
}
```
*Response*
```json
{
    "result": true
}
```
RESULTING DATA: 
```json
[
    {
        "y": 34
    },
    {
        "y": 32
    }
]
```

##### Example 5 Line Chart Delete Firs 3 (5 Entries)
INITIAL DATA: 
```json
[
    {
        "y": 34
    },
    {
        "y": 32
    },  
    {
        "y": 30
    },  
    {
        "y": 39
    },  
    {
        "y": 28
    }
]
```
*Request*
```json
{
    "key": "XXXXXXXXXXXXXXXX",
    "cmd": "DELETE_CHART_DATA",
    "name": "Temperature Chart",
    "last": 3
}
```
*Response*
```json
{
    "result": true
}
```
RESULTING DATA: 
```json
[
    {
        "y": 39
    },
    {
        "y": 28
    }
]
```


#### <a name="head_add_chart_point"> Add Chart Point
##### This commands adds a data point to a chart. 

Command: **ADD_DATA** || **ADD_DATA_POINT** || **ADD_CHART_POINT** 

|Parameters  |Type       |Description               |
|------------|-----------|--------------------------|
|key         |string     |Project API Key           |
|cmd         |string     |Command            |
|name        |string     |Name of the chart to add data to.  |
|point       |string     |Name of the data point.  (Pie, Bar)        |
|value       |number     |Value of the data point. (Pie, Line, Bar)        |
|x           |number     |Value of the X coordinate.  (Scatter, Histogram) |
|y           |number     |Value of the Y coordinate.  (Scatter, Histogram) |


##### Example 1 (Pie, Bar)
INITIAL STORED DATA: 
```json
[
    {
        "point": "Mortgage",
        "value": 540.23
    },
    {
        "point": "Travel",
        "value": 250
    },  
    {
        "point": "Utilities",
        "value": 320.99
    }
]  
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
RESULTING DATA: 
```json
[
    {
        "point": "Mortgage",
        "value": 540.23
    },
    {
        "point": "Travel",
        "value": 250
    },  
    {
        "point": "Utilities",
        "value": 320.99
    },
    {
        "point": "Food",
        "value": 234.23
    }
]  
```

##### Example 2 (Line)
INITIAL DATA: 
```json
[
    {
        "value": 540.23
    },
    {
        "value": 250
    },  
    {
        "value": 320.99
    }  
]
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
RESULTING DATA: 
```json
[
    {
        "value": 540.23
    },
    {
        "value": 250
    },  
    {
        "value": 320.99
    },
    {
        "value": 234.23
    } 
]

```

##### Example 1 (Pie, Bar)
DATA: 
```json
[
    {
        "point": "Mortgage",
        "value": 540.23
    },
    {
        "point": "Travel",
        "value": 250
    },  
    {
        "point": "Utilities",
        "value": 320.99
    }  
]
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
RESULTING DATA: 
```json
[
    {
        "point": "Mortgage",
        "value": 540.23
    },
    {
        "point": "Travel",
        "value": 250
    },  
    {
        "point": "Utilities",
        "value": 320.99
    },
    {
        "point": "Food",
        "value": 234.23
    } 
]
```

##### Example 3 (Scatter)
INTIAL DATA: 
```json
[
    {
        "x": 43,
        "y": -23
    },
    {
        "x": 32,
        "y": -22
    },  
    {
        "x": 43,
        "y": -33
    }  
]
```
*Request*
```json
{
    "key":"XXXXXXXXXXXXXXXX",
    "cmd":"ADD_CHART_POINT",
    "name": "Humidity in function of temperature chart",
    "x": 78,
    "y": 23
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
[
    {
        "x": 43,
        "y": -23
    },
    {
        "x": 32,
        "y": -22
    },  
    {
        "x": 43,
        "y": -33
    },
    {
        "x": 78,
        "y": 23
    }    
]
```

#### <a name="head_get_chart_point"> Get Data Point
##### This commands gets the value of a data point from a chart. 

Command: **GET_DATA** || **GET_DATA_POINT** || **GET_CHART_POINT** 

|Parameters  |Type      |Description               |
|------------|----------|--------------------------|
|key         |string    |Project API Key           |
|cmd         |string    |Command            |
|name        |string    |Name of the chart to get data from.  |
|index       |number    |Index of the Data Point to retrieve. **Do not include this parameter if you want to retrieve the latest data point**|
|range       |object    |Range [start, end], inclusive.|
|last        |number    |Get the last X amount of values| 
|first       |number    |Get the first X amount of values| 

##### Example 1 (Latest Value)

*Request*
```json
{
    "key": "XXXXXXXXXXXXXX",
    "cmd": "GET_DATA_POINT",
    "name": "Temperature"
}
```

*Response* 
```json
{
    "results": {
        "entry": 5,
        "timestamp": 1581368571501,
        "id": "1581368571501jjhlg18nzk6gy0mzx",
        "value": 23
    }
}
```
##### Example 2 (Specific Index)

*Request*
```json
{
    "key": "XXXXXXXXXXXXXX",
    "cmd": "GET_DATA_POINT",
    "name": "Temperature",
    "index": 33
}
```

*Response* (Latest Value)
```json
{
    "results": {
        "entry": 33,
        "timestamp": 1581368571501,
        "id": "1581368571501jjhlg18nzk6gy0mzx",
        "value": 27
    }
}
```

##### Example 3 (Specific Range)
*Request*
```json
{
    "key": "XXXXXXXXXXXXXX",
    "cmd": "GET_DATA_POINT",
    "name": "Temperature",
    "range": [2,4]
}
```
*Response* 
```json
{
    "results": [
        {
            "entry": 2,
            "timestamp": 1581368569082,
            "id": "1581368569082jjhlg18nzk6gy0l4q",
            "value": 23
        },
        {
            "entry": 3,
            "timestamp": 1581368569837,
            "id": "1581368569837jjhlg18nzk6gy0lpp",
            "value": 23
        },
        {
            "entry": 4,
            "timestamp": 1581368570894,
            "id": "1581368570894jjhlg18nzk6gy0mj2",
            "value": 23
        }
    ]
}
```

##### Example 4 (Last X values)
*Request*
```json
{
    "key": "XXXXXXXXXXXXXX",
    "cmd": "GET_DATA_POINT",
    "name": "Temperature",
    "last": 3
}
```
*Response* 
```json
{
    "results": [
        {
            "entry": 3,
            "timestamp": 1581368569837,
            "id": "1581368569837jjhlg18nzk6gy0lpp",
            "value": 23
        },
        {
            "entry": 4,
            "timestamp": 1581368570894,
            "id": "1581368570894jjhlg18nzk6gy0mj2",
            "value": 23
        },
        {
            "entry": 5,
            "timestamp": 15813685690342,
            "id": "15813685690342jhlg18nzk6gy0l4q",
            "value": 24
        }

    ]
}
```

##### Example 4 (First X values)
*Request*
```json
{
    "key": "XXXXXXXXXXXXXX",
    "cmd": "GET_DATA_POINT",
    "name": "Temperature",
    "first": 3
}
```
*Response* 
```json
{
    "results": [
        {
            "entry": 1,
            "timestamp": 1581368569837,
            "id": "1581368569837jjhlg18nzk6gy0lpp",
            "value": 23
        },
        {
            "entry": 2,
            "timestamp": 1581368570894,
            "id": "1581368570894jjhlg18nzk6gy0mj2",
            "value": 23
        },
        {
            "entry": 3,
            "timestamp": 15813685690342,
            "id": "15813685690342jhlg18nzk6gy0l4q",
            "value": 24
        }

    ]
}
```

#### <a name="head_get_chart_data"> Get Chart Data
##### Get all the data from a specific chart.

Command: **GET_CHART_DATA**

|Parameters  |Type      |Description               |
|------------|----------|--------------------------|
|key         |string    |Project API Key           |
|cmd         |string    |Command            |
|name        |string    |Name of the chart to get data from.  |

##### Example
*Request*
```json
{
    "key": "XXXXXXXXXXXXXX",
    "cmd": "GET_CHART_DATA",
    "name": "Temperature"
}
```

*Response*
```json
{
    "meta": {
        "entries": 5,
        "name": "Temperature",
        "created": 1581368521020,
        "id": "1581368521020jjhlg18nzk6gxzk1o",
        "type": "LINE"
    },
    "results": [
        {
            "entry": 1,
            "timestamp": 1581368568262,
            "id": "1581368568262jjhlg18nzk6gy0khy",
            "value": 23
        },
        {
            "entry": 2,
            "timestamp": 1581368569082,
            "id": "1581368569082jjhlg18nzk6gy0l4q",
            "value": 23
        },
        {
            "entry": 3,
            "timestamp": 1581368569837,
            "id": "1581368569837jjhlg18nzk6gy0lpp",
            "value": 23
        },
        {
            "entry": 4,
            "timestamp": 1581368570894,
            "id": "1581368570894jjhlg18nzk6gy0mj2",
            "value": 23
        },
        {
            "entry": 5,
            "timestamp": 1581368571501,
            "id": "1581368571501jjhlg18nzk6gy0mzx",
            "value": 23
        }
    ]
}
```

#### <a name="head_get_all_charts"> Get Chart List
##### Retrieve a list of all the charts for a given project.

Command: **GET_CHART_LIST**

|Parameters  |Type      |Description               |
|------------|----------|--------------------------|
|key         |string    |Project API Key           |
|cmd         |string    |Command            |

##### Example
*Request*
```json
{
  "key": "XXXXXXXXXXXXXX",
  "cmd": "GET_CHART_LIST"
}
```
*Response*
```json
{
    "results": [
        {
            "created": 1581368521020,
            "id": "1581368521020jjhlg18nzk6gxzk1o",
            "name": "Temperature Logging",
            "type": "LINE",
            "entries": 23
        },
        {
            "created": 1581368537965,
            "id": "1581368537965jjhlg18nzk6gxzx4d",
            "name": "Budget",
            "type": "PIE",
            "entries": 12
        },
        {
            "created": 1581386679806,
            "id": "1581386679806jjhlg18nzk6h8srge",
            "name": "Age Spread",
            "type": "HISTO",
            "entries": 44
        },
        {
            "created": 1581386730575,
            "id": "1581386730575jjhlg18nzk6h8tumn",
            "name": "Test Results",
            "type": "SCATTER",
            "entries": 123
        }
    ]
}

```









