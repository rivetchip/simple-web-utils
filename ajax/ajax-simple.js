
function AjaxSimple( method, url, successHandler, errorHandler, data, progressHandler )
{

    // private methods :

    function parse( response )
    {
        return JSON.parse( response );
    }

    function stringify( data )
    {
        return JSON.stringify( data );
    }

    function xhrReadyStateChange()
    {
        if ( this.readyState === this.DONE ) // DONE:4
        {
            var status = this.status;

            if ( status >= 200 && status < 300 ) // OK
            {
                try
                {
                    var response = parse( this.responseText );

                    successHandler && successHandler( response );
                }
                catch( e )
                {
                    errorHandler && errorHandler( 'parsing' );
                }
            }
            else
            {
                errorHandler && errorHandler( 'http' );
            }
        }
    }

    function xhrProgess( event )
    {
        if ( event.lengthComputable )
        {
            var percentComplete = Math.round( event.loaded * 100 / event.total );

            progressHandler && progressHandler( percentComplete );
        }
        else
        {
            progressHandler && progressHandler( 'unknown-size' );
        }
    }

    function xhrTimeout( event )
    {
        errorHandler && errorHandler( 'timeout' );
    }

    function xhrError( event )
    {
        errorHandler && errorHandler( 'error' );
    }

    function xhrAbort( event )
    {
        errorHandler && errorHandler( 'abort' );
    }

    // main :

    var x = new XMLHttpRequest(  );

    x.open( method, url, true );

    //x.withCredentials = true;

    x.onerror = xhrError;
    x.onabort = xhrAbort;
    x.ontimeout = xhrTimeout;

    x.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );

    x.onreadystatechange = xhrReadyStateChange;


    if ( data && typeof data !== 'undefined' ) // with datas
    {

        x.setRequestHeader( 'Content-Type', 'application/json;charset=utf-8' ); // application/x-www-form-urlencoded

        x.upload.onprogress = xhrProgess;

        x.send( stringify( data ) );

    }
    else // normal GET
    {
        x.onprogress = xhrProgess;

        x.send(  );
    }

}

