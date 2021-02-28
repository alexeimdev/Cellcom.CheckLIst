using log4net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;


namespace Cellcom.CheckList.Middlewares
{
    public class ResponseMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILog _logger;

        public ResponseMiddleware(RequestDelegate next)
        {
            _next = next;
            _logger = LogManager.GetLogger(typeof(ResponseMiddleware));
        }

        public async Task InvokeAsync(HttpContext context)
        {
            Stream originBody;

            if (context.Request.Path.StartsWithSegments("/api") == false)
            {
                await _next(context);
            }
            else
            {
                originBody = context.Response.Body;
                try
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        _logger.Debug($"request url: {context.Request.Path}");

                        context.Response.Body = memoryStream;
                        await _next(context);

                        memoryStream.Seek(0, SeekOrigin.Begin);
                        string json = new StreamReader(memoryStream).ReadToEnd();
                        json = WrappSuccess(json);

                        using (var reader = new StreamReader(context.Request.Body))
                        {
                            string requestBody = reader.ReadToEnd();
                            string requestBodyJson = JsonConvert.SerializeObject(requestBody);
                            _logger.Debug($"request body: {requestBodyJson}");
                        }

                        using (StreamWriter writer = new StreamWriter(originBody))
                        {
                            _logger.Debug($"response: {json}");
                            writer.Write(json);
                        }

                        context.Response.Body = originBody;
                    }

                }
                catch (Exception ex)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        context.Response.Body = memoryStream;

                        memoryStream.Seek(0, SeekOrigin.Begin);
                        string json = new StreamReader(memoryStream).ReadToEnd();
                        json = WrapError(json, ex);

                        using (StreamWriter writer = new StreamWriter(originBody))
                        {
                            _logger.Debug($"response: {json}");
                            writer.Write(json);
                        }

                        context.Response.Body = originBody;
                    }
                }
            }
        }


        private string WrapError(string payload, Exception exception)
        {
            _logger.Error("Error. exception: " + exception.Message);

            string errorCode = "99";
            var jsonObj = new
            {
                returnCode = errorCode,
                returnCodeMessage = exception.Message,
                //returnCodeMessage = "אירעה שגיאה",
            };

            return JsonConvert.SerializeObject(jsonObj);
        }

        private string WrappSuccess(string payload)
        {
            dynamic data = JsonConvert.DeserializeObject(payload);

            var res = new MiddlewareResponse
            {
                returnCode = "00",
                returnCodeMessage = "",
                data = data
            };

            return JsonConvert.SerializeObject(res);
        }

    }



    [Serializable]
    public class MiddlewareResponse
    {
        public string returnCode { get; set; }
        public string returnCodeMessage { get; set; }
        public dynamic data { get; set; }
    }
}
