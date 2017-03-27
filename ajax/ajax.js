
function Ajax( params )
{
    var defaults = {
        method: 'GET',
        url: '',

        success: null,
        error: null,
        progess: null,

        parse: null,
        stringify: null,

        data: undefined
    };

    // options :

    var o = extend({}, defaults, params);

    // main :

    var x = new XMLHttpRequest();

    x.open(o.method, o.url, true);

    //x.withCredentials = true;

    x.onerror = xhrError;
    x.onabort = xhrAbort;
    x.ontimeout = xhrTimeout;

    x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    x.onreadystatechange = xhrReadyStateChange;


    if( o.data && typeof o.data !== 'undefined' ) // with datas
    {
        x.setRequestHeader('Content-Type', 'application/json;charset=utf-8'); // application/x-www-form-urlencoded

        x.upload.onprogress = xhrProgess;

        x.send(stringify(o.data));
    }
    else // normal GET
    {
        x.onprogress = xhrProgess;

        x.send();
    }


    // private methods :

    function parse( response )
    {
        if( o.parse === 'text' ) return response;

        return ( o.parse && o.parse(response) || JSON.parse(response) );

        //return ( o.parse ? o.parse(response) : JSON.parse(response) );
    }
    function stringify( data )
    {
        if( o.stringify === 'text' ) return data;

        return ( o.stringify && o.stringify(data) || JSON.stringify(data) );
    }


    function successHandler( response )
    {
        o.success && o.success(response);
    }

    function errorHandler( response )
    {
        o.error && o.error(response);
    }

    function progressHandler( percent ) // download & upload
    {
        o.progess && o.progess(percent);
    }

    function xhrReadyStateChange()
    {
        if( this.readyState === this.DONE ) // DONE:4
        {
            var status = this.status;

            if( status >= 200 && status < 300 ) // OK
            {
                try
                {
                    var response = parse(this.responseText);

                    successHandler(response);
                }
                catch( e )
                {
                    errorHandler('exception');
                }
            }
            else
            {
                errorHandler('http');
            }
        }
    }

    function xhrProgess( event )
    {
        if( event.lengthComputable )
        {
            var percentComplete = Math.round(event.loaded * 100 / event.total);

            progressHandler(percentComplete);
        }
        else
        {
            progressHandler('unknown-size');
        }
    }

    function xhrTimeout( event )
    {
        errorHandler('timeout');
    }

    function xhrError( event )
    {
        errorHandler('error'); // TODO: if abort : called twice (+readystatechange)
    }

    function xhrAbort( event )
    {
        errorHandler('abort');
    }


    // helpers :

    //extend polyfill // shallow copy 

    function extend( target )
    {
        for( var i = 1; i < arguments.length; i++ )
        {
            var source = arguments[i];

            for( var key in source )
            {
                if( Object.prototype.hasOwnProperty.call(source, key) )
                {
                    target[key] = source[key];
                }
            }
        }

        return target;
    }


}
