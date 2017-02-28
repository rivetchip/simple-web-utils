
How to use :
============

Simple functions to do Ajax requests.


ajax.js :
---------


```js
var successHandler = function( response )
{
    console.log('successHandler');
};

var errorHandler = function( status )
{
    //possible values : 'exception' 'http' 'timeout' 'abort' 'error'

    console.log('errorHandler: ' + status);
};

var progressHandler = function( percent )
{
    // if GET -> progess of SEND, if POST -> progress of UPLOAD

    // possible values : int 'unknown-size'

    console.log('progressHandler: ' + percent);
};

var parse = function( response )
{
    // parsing the GET response here

    return response;
};

var stringify = function( data )
{
    // stringify the POST data here

    return data;
};


var data = null;

// each options are optionnal

var options = {
    method: 'GET', // default 'GET'
    url: '/file-get.php',

    success: successHandler,
    error: errorHandler,
    progess: progressHandler, // progress of download or upload

    // possible values : 'text', default JSON.parse/stringify
    parse: parse,
    stringify: stringify,

    // object to send on POST
    data: data
};


Ajax(options);

```



ajax-simple.js (old) :
----------------

Same as Ajax() above, but more simplier, less functions.

```js
var successHandler = functionxxx;

var errorHandler = functionxxx;

var progressHandler = functionxxx; // progress of download or upload


// GET :

var data = null;

AjaxSimple('GET', '/file-get.php', successHandler); // each arguments are optional

AjaxSimple('GET', '/file-get.php', successHandler, errorHandler, data, progressHandler );


//POST :

var data = {
    value1: "test1",
    value2: "test2"
};

AjaxSimple('POST', '/file-post.php', successHandler, errorHandler, data, progressHandler );
```
