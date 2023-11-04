using Microsoft.AspNetCore.SignalR;

namespace Eris.Server.Hubs;

public class NetflixHub : Hub<INetflixClient>
{
    public async Task Pause() => await Clients.All.Pause();

    public async Task Play() => await Clients.All.Play();
}