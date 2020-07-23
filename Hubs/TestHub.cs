using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR;

namespace dotnet_benchmark.Hubs
{
    public class TestHub : Hub
    {
        private readonly IWebHostEnvironment _env;

        private static string _file;

        public TestHub(IWebHostEnvironment env)
        {
            _env = env;
        }
        
        public async Task SendAudio(IAsyncEnumerable<string> stream)
        {
            var enumerator = stream.GetAsyncEnumerator();
            await enumerator.MoveNextAsync();
            _file = enumerator.Current;
        }
        
        public async IAsyncEnumerable<string> ReceiveFile([EnumeratorCancellation] CancellationToken cancellationToken)
        {
            for (var i = 0; i < 1000; i++)
            {
                yield return _file;
            }

            await Clients.Caller.SendAsync("FinishReceiveFile", cancellationToken);
        }
    }
}